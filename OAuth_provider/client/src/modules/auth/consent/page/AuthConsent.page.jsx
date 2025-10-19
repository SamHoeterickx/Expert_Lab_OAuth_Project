import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

//Style
import styles from "./authConsent.module.scss";

export const AuthConsent = () => {
  const [searchParams] = useSearchParams();

  const [urlParams, setUrlParams] = useState({
    response_type: "",
    client_id: "",
    redirect_uri: "",
    state: "",
  });
  const [clientInfo, setClientInfo] = useState({
    client_name: false,
    scope: [],
  });

  useEffect(() => {
    setUrlParams({
      response_type: searchParams.get("response_type"),
      client_id: searchParams.get("client_id"),
      redirect_uri: searchParams.get("redirect_uri"),
      state: searchParams.get("state"),
    });
  }, [searchParams]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/oauth/get-client-info?client_id=${searchParams.get("client_id")}`)
      .then((response) => response.json())
      .then((data) => {
        setClientInfo({
          client_name: data.data.client.client_name,
          scope: data.data.client.scope || [],
        });
      });
  }, [searchParams]);

  const handleApprove = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/oauth/consent`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: urlParams.client_id,
        redirect_uri: urlParams.redirect_uri,
        state: urlParams.state,
        approved: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => (window.location.href = decodeURIComponent(data.redirectUrl)));
  };

  const handleDeny = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/oauth/consent`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: urlParams.client_id,
        redirect_uri: urlParams.redirect_uri,
        state: urlParams.state,
        approved: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.redirectUrl));
  };

  return (
    <section className={clsx(styles["consent-wrapper"])}>
      <div className={clsx(styles["consent-wrapper--card"])}>
        <h2>Toestemming nodig</h2>
        <p>
          <strong>{clientInfo.client_name || "Deze applicatie"}</strong> wil toegang tot:
        </p>

        <ul>
          {clientInfo.scope?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className={clsx(styles["consent-wrapper--actions"])}>
          <button onClick={handleApprove} className={clsx(styles["approve"])}>
            Sta toe
          </button>
          <button onClick={handleDeny} className={clsx(styles["deny"])}>
            Weiger
          </button>
        </div>
      </div>
    </section>
  );
};
