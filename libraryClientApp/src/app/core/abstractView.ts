import { MessageService } from "primeng/api";
import { View } from "./view";

export abstract class AbstractView implements View {
    constructor(public service: MessageService) {}

    showMessage(message: string) {
        this.showWarn('Mensaje', message);
    }

    showInfo(title: string, detail: string) {
        this.showToast('info', title, detail);
    }

    showSuccess(title: string, detail: string) {
        this.showToast('success', title, detail);
    }

    showWarn(title: string, detail: string) {
        this.showToast('warn', title, detail);
    }

    showError(title: string, detail: string) {
        this.showToast('error', title, detail);
    }

    showToast(type: string, title: string, detail: string) {
        this.service.add({
            key: 'tst',
            severity: type,
            summary: title,
            detail,
        });
    }
}