import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import * as Styles from "../styles/chat.js";
import React, { useState } from "react";
import appConfig from "../config.json";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function ChatPage() {
  // Sua lógica vai aqui
  /*
    Usuario
    - USuario digita no campo textarera
    - apertar enter para enviar
    - tem que adicionar o texto em uma lista

    Dev
    - [x] campo criado
    - [x] vamos usar onChange, usar o UseState (ter um IF caso seja enter pra limpar a variavel)
    - [x] lista de mensagem
  */

  const [mensagem, setMensagem] = useState("");
  const [listMensagem, setListMensagem] = useState([]);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listMensagem.length + 1,
      autor: "Luander",
      texto: novaMensagem,
    };
    setListMensagem([mensagem, ...listMensagem]);
    setMensagem("");
  }

  // ./Sua lógica vai aqui
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
            justifyContent: "end",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listMensagem} />

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
        <Text variant="heading5">Imersão React Alura</Text>
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
  console.log("MessageList", props);
  return (

    <Styles.BoxMessageList>
      {props.mensagens.map((mensagem) => {
        return (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://github.com/luanderilidio.png"
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
                    {mensagem.texto}
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
