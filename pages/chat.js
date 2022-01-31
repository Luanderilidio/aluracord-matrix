import { Box, Text, TextField, Button, Image } from "@skynexui/components";
import * as Styles from "../styles/chat.js";
import React from "react";
import { useRouter } from "next/router";
import appConfig from "../config.json";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { createClient } from "@supabase/supabase-js";
import { ButtonSendSticker } from "../src/componentes/buttonSendSticker.js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5NjYwNiwiZXhwIjoxOTU4ODcyNjA2fQ.5pN6Nv8gcgflExxP4LBM49Bhf1VusdXiwlkWtHTBMaY";
const SUPABASE_URL = "https://pjzucaivptnxzdfucecp.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = React.useState('');
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        // console.log('Dados da consulta:', data);
        setListaDeMensagens(data);
      });

    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      console.log('Nova mensagem:', novaMensagem);
      console.log('listaDeMensagens:', listaDeMensagens);
      // Quero reusar um valor de referencia (objeto/array) 
      // Passar uma função pro setState

      // setListaDeMensagens([
      //     novaMensagem,
      //     ...listaDeMensagens
      // ])
      setListaDeMensagens((valorAtualDaLista) => {
        console.log('valorAtualDaLista:', valorAtualDaLista);
        return [
          novaMensagem,
          ...valorAtualDaLista,
        ]
      });
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      autor: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([
        // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
        mensagem
      ])
      .then(({ data }) => {
        console.log('Criando mensagem: ', data);
      });

    setMensagem('');
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listaDeMensagens} />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />

            <ButtonSendSticker
              onStickerClick={(sticker) => {
                handleNovaMensagem(":sticker: " + sticker);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Styles.BoxMessageList>
      {props.mensagens.map((mensagem) => {
        return (
          <ListItem alignItems="flex-start" key={mensagem.id}>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={`https://github.com/${mensagem.autor}.png`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Styles.Container>
                    <Typography
                      sx={{ display: "inline", marginRight: "5px" }}
                      component="span"
                      variant="body1"
                      color="secundary"
                    >
                      {mensagem.autor}
                    </Typography>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="caption"
                      color="primary"
                    >
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Styles.Container>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline", color: "#FFFFFF" }}
                    component="span"
                    variant="body2"
                  >
                    {mensagem.texto.startsWith(":sticker:") ? (
                      <Image src={mensagem.texto.replace(":sticker:", "")} />
                    ) : (
                      mensagem.texto
                    )}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </Styles.BoxMessageList>
  );
}
