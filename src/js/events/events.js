import { parse } from "../technical/parsing";
import { save } from "../technical/save-load";
import { isSave, settings } from "../settings";

document.addEventListener("nav-event", ({ detail }) => {
	const area = document.querySelector(".area");
	area.focus();
	parse();
	switch (detail.type) {
		case "color":
			document.execCommand("foreColor", null, detail.value);
			break;
		case "back-color":
			document.execCommand("backColor", null, detail.value);
			break;
		case "bold":
			document.execCommand("bold", null, null);
			break;
		case "italic":
			document.execCommand("italic", null, null);
			break;
		case "underline":
			document.execCommand("underline", null, null);
			break;
		case "lineThrough":
			document.execCommand("strikeThrough", null, null);
			break;
		case "spellcheck":
			settings.spellcheck = detail.value == "true" ? true : false;
			area.setAttribute("spellcheck", detail.value);
			break;
		case "delete":
			document.execCommand("delete", null, null);
			break;
		case "clean":
			document.execCommand("removeFormat", null, null);
			break;
		case "undo":
			document.execCommand("undo", null, null);
			break;
		case "redo":
			document.execCommand("redo", null, null);
			break;
		case "align":
			document.execCommand(`justify${detail.value}`, null, null);
			break;
		case "list":
			document.execCommand(`insert${detail.value}`, null, null);
			break;
		case "font-size":
			document.execCommand(`fontSize`, null, detail.value);
			break;
		case "font-family":
			document.execCommand(`fontName`, null, detail.value);
			break;
		case "dent":
			document.execCommand(detail.value, null, null);
			break;
		case "horizontal":
			document.execCommand("insertHorizontalRule", null, null);
			break;
		case "image":
			document.execCommand("insertImage", null, detail.value);
			break;
		case "save":
			save();
			isSave.state = true;
			document.title = "Notes";
			alert("Текст сохранен успешно!");
			break;
		case "copyHTML":
			navigator.clipboard.writeText(area.innerHTML).then(() => {
				alert("Текст успешно скопирован!");
			});
			break;
		case "createLink":
			const linkName = document.querySelector("#linkName").value;
			const link = document.querySelector("#link").value;
			document.execCommand("insertHTML", null, `<a href="${link}">${linkName}</a>`);
			break;
	}
});
