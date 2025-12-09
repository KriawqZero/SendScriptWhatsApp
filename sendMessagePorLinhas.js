async function enviarScriptPorLinhas(scriptText){
	// separa preservando cada linha exatamente como está
	const lines = scriptText
		.split(/\r?\n/)
		.map(l => l.trimEnd()); // remove só espaços do fim, mantém linha vazia

	const main = document.querySelector("#main");
	const textarea = main.querySelector(`div[contenteditable="true"]`);
	
	if (!textarea) throw new Error("Não há uma conversa aberta");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		textarea.focus();
		document.execCommand('insertText', false, line);
		textarea.dispatchEvent(new Event('change', { bubbles: true }));

		setTimeout(() => {
			(
				main.querySelector(`[aria-label="Send"]`) ||
				main.querySelector(`[data-testid="send"]`) ||
				main.querySelector(`[data-icon="send"]`)
			).click();
		}, 100);

		if (i < lines.length - 1) {
			await new Promise(resolve => setTimeout(resolve, 250));
		}
	}

	return lines.length;
}

// Exemplo:
enviarScriptPorLinhas(`
linha 1
linha 2
linha 3

linha 5 com linha 4 vazia antes
`);
