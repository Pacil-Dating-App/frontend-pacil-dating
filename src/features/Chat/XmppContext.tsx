import React, { useEffect, useState } from 'react';
import { Client, client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";

interface SnackBarProps {
  severity?: "success" | "info" | "warning" | "error",
  open?: boolean,
  content?: string,
}

interface XmppContextProps {
  setMatch: (email: string) => void;
  xmppClient?: Client;
  sendMessage: (textMessage: string) => void;
}

const XmppContext = React.createContext<XmppContextProps>({
  setMatch: function (email: string): void {
    throw new Error('Function not implemented.');
  },
  xmppClient: undefined,
  sendMessage: function (textMessage: string): void {
    throw new Error('Function not implemented.');
  }
});

interface XmppProviderProps {
  children: React.ReactNode;
}

function XmppProvider({ children }: XmppProviderProps) {
  const xmpp = client({
    service: "ws://law-openfire.stevenn.my.id:7070/ws/ ",
    domain: "law-openfire.stevenn.my.id",
    username: "testing",
    password: "testing",
  });
  
  debug(xmpp, true);
  
  xmpp.on("error", (err) => {
    console.error(err);
  });
  
  xmpp.on("offline", () => {
    console.log("offline");
  });
  
  xmpp.on("stanza", async (stanza) => {
    if (stanza.is("message")) {
      await xmpp.send(xml("presence", { type: "unavailable" }));
      await xmpp.stop();
    }
  });
  
  xmpp.on("online", async (address) => {
    // Makes itself available
    await xmpp.send(xml("presence"));
  
    // Sends a chat message to itself
    const message = xml(
      "message",
      { type: "chat", to: address },
      xml("body", {}, "hello world"),
    );
    await xmpp.send(message);
    console.log(message);
  });

  const [match, setMatch] = useState<string>('');

  const sendMessage = (textMessage: string) => {
    xmpp.send(xml("message", { to: match, type: "chat" }, xml("body", undefined, textMessage))).then((value) => {
      console.log(value);
    }).catch((reason) => {
      console.log(reason);
    });
  }

  useEffect(() => {
    xmpp.start().catch(console.error);
  });

  const value: XmppContextProps = {
    xmppClient: xmpp,
    setMatch,
    sendMessage
  }
  
  return (
    <XmppContext.Provider value={value}>
      {children}
    </XmppContext.Provider>
  );
}

const useXmpp = () => React.useContext(XmppContext);

export { XmppProvider, useXmpp };
