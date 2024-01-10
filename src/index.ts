const renderPages = (pageName: string): void => {
  fetch(`pages/${pageName}.html`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Erro ao carregar a página");
      }
      return resp.text();
    })
    .then((html) => {
      const rootElem = document.getElementById("root") as HTMLElement;
      if (rootElem) {
        rootElem.innerHTML = html;

        const formStart = document.getElementById(
          "form-start"
        ) as HTMLFormElement;
        if (formStart) {
          formStart.addEventListener("submit", (event) => {
            event.preventDefault();
            armazenarNome();
          });
        }
      } else {
        console.error('Elemento com ID "root" não encontrado.');
      }
    })
    .catch((error) => {
      console.error("Erro durante a requisição fetch:", error);
    });
};

renderPages("start");

function armazenarNome(): void {
  const nomeUsuarioInput = document.getElementById(
    "input-name"
  ) as HTMLInputElement | null;

  if (nomeUsuarioInput && nomeUsuarioInput.value.trim() !== "") {
    const nomeUsuario = nomeUsuarioInput.value;
    localStorage.setItem("usuario", nomeUsuario);

    const mensagem = criarMensagem("Nome armazenado com sucesso!");
    document.body.appendChild(mensagem);
    mensagem.addEventListener("click", () => {
      mensagem.remove();
    });
    renderPages("quiz");
  } else {
    const mensagem = criarMensagem(
      "Por favor, digite seu nome antes de começar."
    );
    document.body.appendChild(mensagem);

    mensagem.addEventListener("click", () => {
      mensagem.remove();
    });
  }
}

function criarMensagem(texto: string): HTMLDivElement {
  const mensagem = document.createElement("div");
  mensagem.textContent = texto;
  mensagem.classList.add("alert-message");
  return mensagem;
}

//aparecer perguntas....

interface Question {
  question: string;
  options: string[];
  correct: number;
}
document.addEventListener("DOMContentLoaded", () => {
  carregarPergunta();
});

function carregarPergunta(): void {
  console.log("Iniciando carregarPergunta");
  fetch("questions.json")
    .then((resp) => {
      console.log("Requisição fetch concluída");

      if (!resp.ok) {
        throw new Error("Erro na requisição fetch.");
      }

      return resp.json();
    })
    .then((data) => {
      console.log("Dados do JSON recebidos:", data);
    })
    .catch((error) => {
      console.error("Erro durante a requisição fetch:", error);
    });



    
}
