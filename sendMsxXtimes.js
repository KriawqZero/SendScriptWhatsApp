async function enviarScript(scriptText, vezes){
	const main = document.querySelector("#main");
	const textarea = main.querySelector(`div[contenteditable="true"]`);
	
	if (!textarea) throw new Error("Não há uma conversa aberta");

	for (let i = 0; i < vezes; i++) {

		textarea.focus();
		document.execCommand('insertText', false, scriptText);
		textarea.dispatchEvent(new Event('change', { bubbles: true }));

		setTimeout(() => {
			(main.querySelector(`[data-testid="send"]`) || 
			 main.querySelector(`[data-icon="send"]`)
			).click();
		}, 100);

		await new Promise(resolve => setTimeout(resolve, 250));
	}

	return vezes;
}

// Exemplo:
enviarScript(`mensagem aqui`, 5);
