// import { postCard } from '../../../util/apis';
import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './create-card.component.html';
import './create-card.component.scss';

export class AppCreateCardComponent {
    apiBody: { [x: string]: string } = {};

    render(): void {
        addTemplateToElementBasedOnId('app-create-card', template);
        this.addEventListeners()
    }

    addEventListeners(): void {
        const submitButton = document.getElementById('submit-btn');
        if (submitButton) {
            submitButton.addEventListener('click', this.submitForm.bind(this)); // 'this' indicating 'class AppCreateCardComponent'. When pass 'this.submitForm' as a callback to the click event listener, the method loses its reference to the original 'AppCreateCardComponent' instance, which makes 'this' in 'submitForm' undefined or refers to the button itself rather than the component instance.
        }
        const titleField = document.getElementById('card-form');
        if (titleField) {
            titleField.addEventListener('input', this.patchValue.bind(this));
        }
    }

    submitForm(event: Event): void {
        event.preventDefault();
        this.createApiBody(); // 'this' is comming from 'bind(this)'
        console.log('Submit button clicked');
        if (this.allErrorHandle()) {
            window.alert('Enter all required fields')
        } else {

        }
        // postCard({
        //     title: 'my title',
        //     description: 'my title'
        // })
    }

    createApiBody() {
        const title = (document.querySelector('[name="title"]') as HTMLInputElement)?.value?.trim();
        const description = (document.querySelector('[name="description"]') as HTMLInputElement)?.value?.trim();
        const imageLink = (document.querySelector('[name="imageLink"]') as HTMLInputElement)?.value?.trim();
        this.apiBody = {
            title: title,
            description: description || '',
            imageLink: imageLink || ''
        }
    }

    patchValue() {
        this.createApiBody();
        this.errorHandle('title-wrap', 'title');
        this.errorHandle('description-wrap', 'description');
    }

    allErrorHandle() {
        const titleError = this.errorHandle('title-wrap', 'title');
        const descriptionError = this.errorHandle('description-wrap', 'description');
        return titleError && descriptionError;
    }

    errorHandle(wrapElementId: string, apiBodyKey: string) {
        let hasError = false;
        const wrapElement = document.getElementById(wrapElementId);
        if (wrapElement) {
            if (this.apiBody?.[apiBodyKey]) { // Check if the field have value 
                wrapElement.classList.remove('error'); // add error class
                hasError = true;
            } else {
                wrapElement.classList.add('error'); // remove error class
            }
        }
        return hasError;
    }
}  