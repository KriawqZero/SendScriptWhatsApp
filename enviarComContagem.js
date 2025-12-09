async function enviarContagem(){
	const main = document.querySelector("#main");
	const textarea = main.querySelector(`div[contenteditable="true"]`);
	if (!textarea) throw new Error("Não há uma conversa aberta");

	for (let n = 1; n <= 1000; n++) {
		const msg = `Eu te amo ${n}`;

		textarea.focus();
		document.execCommand('insertText', false, msg);
		textarea.dispatchEvent(new Event('change', { bubbles: true }));

		setTimeout(() => {
			const sendBtn = main.querySelector(`button[aria-label="Send"][data-tab="11"]`);
			if (sendBtn) sendBtn.click();
			else throw new Error("Botão de envio não encontrado");
		}, 100);

		if (n < 1000) {
			await new Promise(resolve => setTimeout(resolve, 250));
		}
	}

	return 1000;
}

// executar:
enviarContagem();
