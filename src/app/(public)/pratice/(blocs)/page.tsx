'use client';

import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';

import GeminiResponseComponent from './geminiResponse';
import ParticleBackground from './ParticleBackground';

export type GeminiParsedResponse = {
  original: string;
  fix: string;
  response: string;
  translateResponse: string;
  explication: string;
  erros: { parte: string; problema: string; correcao: string }[];
  hint: string;
};


const TranscriptionUI = () => {

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [loadingGemini, setLoadingGemini] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState<GeminiParsedResponse | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');


  const languages = [
    { code: 'de-DE', label: 'Alemão' },
    { code: 'zh-CN', label: 'Chinês (Mandarim)' },
    { code: 'ko-KR', label: 'Coreano' },
    { code: 'es-ES', label: 'Espanhol' },
    { code: 'fr-FR', label: 'Francês' },
    { code: 'en-US', label: 'Inglês' },
    { code: 'it-IT', label: 'Italiano' },
    { code: 'ja-JP', label: 'Japonês' },
    { code: 'pt-BR', label: 'Português (Brasil)' },
    { code: 'ru-RU', label: 'Russo' },
  ];

  const onSend = async (transcript: string) => {
    setLoadingGemini(true);
    if (!transcript.trim()) return;

    try {
      const prompt = `
      Você é um assistente especializado em revisar frases em ${selectedLanguage}para alunos iniciantes.
      
      Sua tarefa é analisar a frase fornecida e retornar uma resposta em formato JSON (válido), **sem markdown e sem texto fora do JSON**.
      
      ### Objetivos da resposta:
      - Corrigir a frase fornecida (campo: "frase_corrigida").
      - Explicar os principais erros de forma simples, clara e em **português** (campo: "explicacao").
      - Listar cada erro encontrado em uma lista detalhada (campo: "erros").
      - Fornecer uma dica útil e relacionada ao aprendizado da frase (campo: "dica").
      - Responder ao conteúdo da frase com uma nova resposta em **inglês**, incluindo uma **pergunta relacionada ao assunto da frase** (campo: "resposta").
      
      ### Regras:
      - A **"frase_corrigida"** deve estar 100% em ${selectedLanguage} e gramaticalmente correta.
      - A explicação deve ser simples e sem termos técnicos (campo: "explicacao").
      - Se a frase estiver incorreta, no campo "resposta" comece com:  
        \`Você quis dizer ... \` no idioma ${selectedLanguage} seguido de uma versão interpretada do que o aluno tentou dizer.
      - Se a frase estiver correta, apenas responda com base no conteúdo, em ${selectedLanguage}.
      -translateResponse tem que estar no idioma em portugues.
      - Ignore erros de pontuação, acentuação, vírgulas e espaços — **não comente sobre isso**.
      - Toda explicação deve focar apenas no conteúdo das palavras e no sentido da frase.
      
      ### Formato de saída (obrigatório):
      
      {
        "original": "string",
        "fix": "string",
        "response": "string",
        "translateResponse": "string",
        "explication": "string",
        "erros": [
          {
            "parte": "string",
            "problema": "string",
            "correcao": "string"
          }
        ],
        "hint": "string"
      }
      
      Agora analise a seguinte frase:
      
      "${transcript}"
      `;


      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const text = data.text;

      const parsed = parseGeminiResponse(text);
      if (parsed) {
        setGeminiResponse(parsed);
      } else {
        setGeminiResponse(
          {
            original: '',
            fix: '',
            response: '',
            translateResponse: '',
            explication: 'Erro ao interpretar a resposta do Gemini.',
            erros: [],
            hint: ''
          }
        );
      }
    } catch (error) {
      console.error('Erro ao enviar para o Gemini:', error);

    } finally {
      setLoadingGemini(false);
    }
  };
  function parseGeminiResponse(text: string) {
    try {
      const cleanedText = text.replace(/```json\s*|\s*```/g, '');
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error("Erro ao processar a resposta:", error);
      return null;
    }
  }

  const censurarPalavras = (texto: string): string => {
    const palavrasBanidas = [
      'idiot', 'fuck', 'shit', 'bitch', 'asshole',
      'bastard', 'dumb', 'stupid', 'fucking', 'motherfucker'
    ];
    const regex = new RegExp(`\\b(${palavrasBanidas.join('|')})\\b`, 'gi');
    return texto.replace(regex, '*****');
  };

  const onStart = () => {
    const SpeechRecognition =
      typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

    if (!SpeechRecognition) {
      alert('Seu navegador não suporta o Web Speech API');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = selectedLanguage;
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const text = Array.from(event.results).map((result) => result[0].transcript).join('');
      const textoFiltrado = censurarPalavras(text);
      setTranscript(textoFiltrado);
    };

    recognitionRef.current.start();
    setIsListening(true);

    // 🎙 Inicia a gravação da voz do usuário
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
      };

      mediaRecorderRef.current.start();
    });
  };

  const onStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const onSpeakNative = () => {
    if (!transcript) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = selectedLanguage;

    setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
    };

    synth.speak(utterance);
  };

  const onSpeakRecorded = () => {
    if (!audioBlob) return;

    const audioURL = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioURL);

    setIsPlaying(true);
    audio.onended = () => {
      setIsPlaying(false);
    };

    audio.play();
  };
  const onClear = () => {
    setTranscript('');
    setGeminiResponse(null);
    setAudioBlob(null);
  };

  useEffect(() => {
    if (geminiResponse && geminiResponse.response) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(geminiResponse.response);
      utterance.lang = selectedLanguage;
      synth.speak(utterance);
    }
  }, [geminiResponse, selectedLanguage]);
  
  useEffect(() => {
    if (!transcript) return;

    const formatted = transcript
      .replace(/([.,])(?!\s)/g, ' ')
      .split(/\s+/)

    setTranscript(formatted.join(' '));
  }, [transcript]);

  return (
    <ParticleBackground>

      <Box p={4}>
        <Avatar alt="Remy Sharp" src='/robot.png' sx={{ width: 100, height: 100, margin: '0 auto' }} />
        <Typography variant="h3" textAlign={'center'} py={3} >Dialog AI</Typography>
        <Box display={'flex'} justifyContent={'center'} gap={2} mb={2} >

          <Button variant="contained" color="secondary" onClick={onSpeakNative} disabled={isPlaying || !audioBlob}>
            Reproduzir com voz nativa
          </Button>

          <Button variant="contained" color="secondary" onClick={onSpeakRecorded} disabled={isPlaying || !audioBlob}>
            Reproduzir com a sua voz
          </Button>
        </Box>

        <Paper elevation={3} style={{ padding: '1rem', maxWidth: 600, margin: '1rem auto' }}>
          <Typography variant="h6">{!isListening ? transcript === '' ? 'Clique em iniciar e diga algo' : '' : !transcript ? 'Ouvindo ...' : ''}</Typography>
          <Typography variant="h6">
            {transcript}
          </Typography>
        </Paper>
        <Box display={'flex'} justifyContent={'center'}>

          <Grid container spacing={2} alignItems={'center'} width={600} >
            <Grid size={3}>
              <FormControl fullWidth>
                <InputLabel>Idioma</InputLabel>
                <Select
                  size='small'
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  label="Idioma"
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={3}>
              <Button
                fullWidth
                variant="contained"
                color={isListening ? 'error' : 'primary'}
                onClick={isListening ? onStop : onStart}
              >
                {isListening ? 'Parar' : 'Iniciar'}
              </Button>
            </Grid>
            <Grid size={3}>


              <Button variant="outlined" onClick={onClear} fullWidth>
                Limpar
              </Button>

            </Grid>
            <Grid size={3}>
              <Button variant="contained" color="success" onClick={() => onSend(transcript)} fullWidth>
                Enviar para IA
              </Button>

            </Grid>
            <Grid size={12}>
              <GeminiResponseComponent geminiResponse={geminiResponse} loadingGemini={loadingGemini} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ParticleBackground >

  );
};

export default TranscriptionUI;
