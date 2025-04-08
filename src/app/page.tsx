'use client';

import { Avatar, Box, Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
// import TranscriptionPage from "./pratice/page";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';



export default function Home() {
  return (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <Card sx={{ width: '100%', maxWidth: 600, minWidth:400, padding: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>

        <Avatar alt="Remy Sharp" src='/robot.png' sx={{ width: 100, height: 100, margin: '0 auto' }} />
        <Typography variant="h3" textAlign={'center'} py={3} >Dialog AI</Typography>

        <Box display={'flex'} mb={2} flexDirection={'column'} gap={2}>

          <Button
            variant="outlined"
            size="large"
            color="primary"
            component={Link}
            href="/pratice"
          >
            <RecordVoiceOverIcon style={{ marginRight: '0.5rem' }} />
            Praticar com a IA
          </Button>
        </Box>
      </CardContent>
    </Card>

  </Box>

  );
}