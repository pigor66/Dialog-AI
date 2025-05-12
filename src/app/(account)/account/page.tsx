"use client";

import { ChangeEvent, useState } from "react";

type FormFields = {
  [key: string]: string;
};

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  const [formValues, setFormValues] = useState<FormFields>({});

  const handleTabClick = (tab: "signup" | "login") => {
    setActiveTab(tab);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLabelClass = (name: string) => {
    return formValues[name] ? "active highlight" : "";
  };

  return (
    <div className="form">
      <ul className="tab-group">
        <li className={`tab ${activeTab === "signup" ? "active" : ""}`}>
          <a onClick={() => handleTabClick("signup")}>Sign Up</a>
        </li>
        <li className={`tab ${activeTab === "login" ? "active" : ""}`}>
          <a onClick={() => handleTabClick("login")}>Log In</a>
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === "signup" && (
          <div id="signup">
            <h1>Registrar-se</h1>
            <form>
              <div className="top-row">
                <div className="field-wrap">
                  <label className={handleLabelClass("firstName")}>
                    Primeiro nome<span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    autoComplete="off"
                    value={formValues.firstName || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field-wrap">
                  <label className={handleLabelClass("lastName")}>
                    Sobrenome<span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    autoComplete="off"
                    value={formValues.lastName || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="field-wrap">
                <label className={handleLabelClass("email")}>
                  Email<span className="req">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="off"
                  value={formValues.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field-wrap">
                <label className={handleLabelClass("password")}>
                  Senha<span className="req">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="off"
                  value={formValues.password || ""}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="button button-block">
                Criar conta
              </button>
            </form>
          </div>
        )}

        {activeTab === "login" && (
          <div id="login">
            <h1>Bem vindo</h1>
            <form>
              <div className="field-wrap">
                <label className={handleLabelClass("loginEmail")}>
                  Email<span className="req">*</span>
                </label>
                <input
                  type="email"
                  name="loginEmail"
                  required
                  autoComplete="off"
                  value={formValues.loginEmail || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field-wrap">
                <label className={handleLabelClass("loginPassword")}>
                  Senha<span className="req">*</span>
                </label>
                <input
                  type="password"
                  name="loginPassword"
                  required
                  autoComplete="off"
                  value={formValues.loginPassword || ""}
                  onChange={handleInputChange}
                />
              </div>
              <p className="forgot">
                <a href="#">Forgot Password?</a>
              </p>
              <button type="submit" className="button button-block">
                Log In
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        :global(body) {
          background: #c1bdba;
          font-family: 'Titillium Web', sans-serif;
        }

        .form {
          background: rgba(19, 35, 47, 0.9);
          padding: 40px;
          max-width: 600px;
          margin: 40px auto;
          border-radius: 4px;
          box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
        }

        .tab-group {
          list-style: none;
          padding: 0;
          margin: 0 0 40px 0;
          display: flex;
        }

        .tab {
          flex: 1;
        }

        .tab a {
          display: block;
          text-decoration: none;
          padding: 15px;
          background: rgba(160, 179, 176, 0.25);
          color: #a0b3b0;
          font-size: 20px;
          text-align: center;
          cursor: pointer;
          transition: 0.5s ease;
        }

        .tab a:hover {
          background: #159f7e;
          color: white;
        }

        .tab.active a {
          background: #1ab188;
          color: white;
        }

        h1 {
          text-align: center;
          color: white;
          font-weight: 300;
          margin: 0 0 40px;
        }

        label {
          position: absolute;
          transform: translateY(6px);
          left: 13px;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.25s ease;
          pointer-events: none;
          font-size: 22px;
        }

        label.active {
          transform: translateY(50px);
          left: 2px;
          font-size: 14px;
        }

        label.highlight {
          color: white;
        }

        .req {
          margin: 2px;
          color: #1ab188;
        }

        input {
          font-size: 22px;
          width: 100%;
          padding: 5px 10px;
          background: none;
          border: 1px solid #a0b3b0;
          color: white;
          transition: border-color 0.25s ease;
        }

        input:focus {
          outline: 0;
          border-color: #1ab188;
        }

        .field-wrap {
          position: relative;
          margin-bottom: 40px;
        }

        .top-row {
          display: flex;
          gap: 4%;
        }

        .top-row > div {
          width: 48%;
        }

        .button {
          border: 0;
          padding: 15px 0;
          font-size: 2rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: #1ab188;
          color: white;
          transition: all 0.5s ease;
        }

        .button:hover {
          background: #159f7e;
        }

        .button-block {
          display: block;
          width: 100%;
        }

        .forgot {
          margin-top: -20px;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
