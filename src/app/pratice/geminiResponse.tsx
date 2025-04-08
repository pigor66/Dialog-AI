'use client'

import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import { GeminiParsedResponse } from './main';
import HighlightChanges from './translateColorRequest';

interface TranscriptionUIProps {
  loadingGemini: boolean
  geminiResponse: GeminiParsedResponse | null


}


const GeminiResponseComponent = ({
  geminiResponse,
  loadingGemini
}: TranscriptionUIProps) => {


  if (loadingGemini) {
    return (
      <Box sx={{ width: '100%', maxWidth: 500, margin: '2rem auto', textAlign: 'left' }}>
        <Typography variant="body1" textAlign={'center'} my={2}>
          Análisando resposta ...
        </Typography>
        <LinearProgress />
      </Box>
    )
  }

  return (<>

    {geminiResponse && (

      <Paper elevation={3} style={{ padding: '1rem', maxWidth: 600, margin: '2rem auto', textAlign: 'left' }}>
        <Typography variant="h6">Frase original:</Typography>
        <HighlightChanges
          original={geminiResponse.original}
          corrected={geminiResponse.fix}
        />

        <Typography variant="h6" mt={2}>
          Frase corrigida:
        </Typography>
        <Typography color="#15ff0096">{geminiResponse.fix}</Typography>

        <Typography variant="h6" mt={2}>
          Explicação:
        </Typography>
        <Typography>{geminiResponse.explication}</Typography>
        <Typography variant="h6" mt={2}>
          Resposta:
        </Typography>
        <Typography>{geminiResponse.response}</Typography>
        <Typography variant="h6" mt={2}>
          Resposta traduzida:
        </Typography>
        <Typography>{geminiResponse.translateResponse}</Typography>



        <Typography variant="h6" mt={2}>
          Erros identificados:
        </Typography>
        {geminiResponse.erros.length > 0 ? (
          geminiResponse.erros.map((erro, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <Typography>
                <strong>Parte:</strong> {erro.parte}
              </Typography>
              <Typography>
                <strong>Problema:</strong> {erro.problema}
              </Typography>
              <Typography>
                <strong>Correção:</strong> {erro.correcao}
              </Typography>
            </div>
          ))
        ) : (
          <Typography>Nenhum erro identificado.</Typography>
        )}

        <Typography variant="h6" mt={2}>
          Dica:
        </Typography>
        <Typography>{geminiResponse.hint}</Typography>
      </Paper>

    )}
  </>
  );
};

export default GeminiResponseComponent;
