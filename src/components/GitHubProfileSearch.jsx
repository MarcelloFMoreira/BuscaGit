import React, { useState } from "react";
import "./GitHubProfileSearch.css";
import GitLogo from './assets/GitLogo.png';
import GitTXT from './assets/GitTXT.png';
import Lupa from './assets/Lupa.png';

export default function GitHubProfileSearch() {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const buscarPerfil = async () => {
        if (!username) return;

        setLoading(true);
        setErro("");
        setProfile(null);

        try {
            const resposta = await fetch(`https://api.github.com/users/${username}`);
            if (!resposta.ok) throw new Error("Nenhum perfil foi encontrado com ese nome de usuário. Tente novamente");

            const dados = await resposta.json();
            setProfile(dados);
        } catch (err) {
            setErro(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (




        <div className="BG">
            <div className="ContainerGit">
                <div className="TextoPrincipal">
                    <img src={GitLogo} alt="Logo GitHub" className="Logo" />    
                    <h1 className="TitleH1">Perfil</h1>
                    <img src={GitTXT} className="GitTxt" />
                </div>{/*TextoPrincipal*/}
                <div className="BuscarInput">
                    <input
                        type="text"
                        placeholder="Digite um usuário do Github"
                        className="inputEscrever"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        onClick={buscarPerfil}
                        className="BuscarButton"
                    >
                        <img src={Lupa} alt="Buscar" />
                    </button>
                </div>

                {loading && <p className="Loading">Carregando perfil...</p>}

                {erro ? (
                    <div className="containerError">
                        <p className="Error">{erro}</p>
                    </div>
                ) : profile ? (
                    <div className="infosPerfil">
                        <img
                            src={profile.avatar_url}
                            alt={profile.name}
                            className="AvatarPerfil"
                        />
                        <div className="NomeDescrição">
                            <h2>{profile.name || "Sem nome"}</h2>
                            <p>{profile.bio || "Sem bio disponível."}</p>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>




    );
}