import { editCard, getCard, postCard } from '../../../util/apis';
import { addTemplateToElementBasedOnId, getRouterInformation } from '../../../util/render.util';
import { navigateTo } from '../../app.router';
import { Card } from '../../interfaces/cards';
import template from './create-card.component.html';
import './create-card.component.scss';

export class AppCreateCardComponent {
    cardId = '';
    apiBody: { [x: string]: string } = {};
    submitButton: HTMLElement | null | undefined;
    form: HTMLElement | null | undefined;
    imagePattern = /^(https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|tif)(\?.*)?)$/i; // pattern if a text starts with http:// or https:// and ends with a recognized image format like .jpg, .jpeg, .png, .gif, .bmp, .webp, .svg, or .tiff

    render(): void {
        addTemplateToElementBasedOnId('app-create-card', template);
        this.cardId = getRouterInformation()[1];
        this.addEventListeners();
        this.getCardFromApi();
    }

    getCardFromApi() {
        if (this.cardId) {
            this.showHideLoader(true); // start main page loader
            getCard(this.cardId).then((response: Card | undefined) => { // Getting a single card details
                console.log('card', response);
                this.patchValue(response);
                this.showHideLoader(false); // stop main page loader
            })
        }
    }

    patchValue(card: Card | undefined) {
        const title = (document.querySelector('[name="title"]') as HTMLInputElement);
        const description = (document.querySelector('[name="description"]') as HTMLInputElement);
        const imageLink = (document.querySelector('[name="imageLink"]') as HTMLInputElement);
        if (title) {
            title.value = card?.title || '';
        }
        if (description) {
            description.value = card?.description || '';
        }
        if (imageLink) {
            imageLink.value = card?.imageLink || '';
        }
    }

    addEventListeners(): void {
        this.submitButton = document.getElementById('submit-btn');
        if (this.submitButton) {
            this.submitButton.addEventListener('click', this.submitForm.bind(this)); // 'this' indicating 'class AppCreateCardComponent'. When pass 'this.submitForm' as a callback to the click event listener, the method loses its reference to the original 'AppCreateCardComponent' instance, which makes 'this' in 'submitForm' undefined or refers to the button itself rather than the component instance.
        }
        this.form = document.getElementById('card-form');
        if (this.form) {
            this.form.addEventListener('input', this.changeInput.bind(this));
        }
    }

    submitForm(event: Event): void { // Will call this function when click on 'Submit' button
        event.preventDefault();
        this.createApiBody(); // 'this' is comming from 'bind(this)'
        this.form?.classList?.add('form-submitted');
        if (this.allErrorHandle()) { // If form invalid
            const firstInvalidField = this.form?.querySelector('.error');
            if (firstInvalidField) {
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' }); // First invalid field will scroll to center autometically
            }
        } else { // If form valid
            this.startLoader(); // start submit button loader
            let api: Promise<any>;
            if (this.cardId) {
                api = editCard(this.cardId, this.apiBody);
            } else {
                api = postCard(this.apiBody);
            }
            api.then(response => {
                console.log('Added data:', response);
                navigateTo('card-list', null);
            });
        }
    }

    createApiBody() {
        const title = (document.querySelector('[name="title"]') as HTMLInputElement)?.value?.trim();
        const description = (document.querySelector('[name="description"]') as HTMLInputElement)?.value?.trim();
        const imageLink = (document.querySelector('[name="imageLink"]') as HTMLInputElement)?.value?.trim();
        this.apiBody = { // API body which will go during api call
            title: title,
            description: description || '',
            imageLink: imageLink || ''
        }
    }

    changeInput() { // Will call if input change for any field
        this.createApiBody();
        this.allErrorHandle();
    }

    allErrorHandle(): boolean { // Check every field if present any error. If any of field has error then this function will return 'true'
        const titleError = this.errorHandle('title-wrap', 'title');
        const descriptionError = this.errorHandle('description-wrap', 'description');
        const imageLinkError = this.patternErrorHandle('image-link-wrap', 'imageLink', this.imagePattern);
        return titleError || descriptionError || imageLinkError;
    }

    errorHandle(wrapElementId: string, apiBodyKey: string): boolean { // Making field mandatary. If no input value present, then will return 'true'
        let hasError = false;
        const wrapElement = document.getElementById(wrapElementId);
        if (wrapElement) {
            if (this.apiBody?.[apiBodyKey]) { // Check if the field have value 
                wrapElement.classList.remove('error'); // Remove 'error' class if have value
            } else {
                wrapElement.classList.add('error'); // Add 'error' class if no value present
                hasError = true;
            }
        }
        return hasError;
    }

    patternErrorHandle(wrapElementId: string, apiBodyKey: string, pattern: RegExp): boolean { // Add pattern validetion. If pattern not match, then will return 'true'
        let hasError = false;
        const inputValue = this.apiBody?.[apiBodyKey];
        const wrapElement = document.getElementById(wrapElementId);
        if (wrapElement) {
            if (!inputValue || pattern.test(inputValue)) { // Check if the field has a value and matches the specified pattern
                wrapElement.classList.remove('error'); // Remove 'error' class if valid
            } else {
                wrapElement.classList.add('error'); // Add 'error' class if invalid
                hasError = true;
            }
        }
        return hasError;
    }

    startLoader() { // start submit button loader
        const submitButtonSpinner = document.getElementById('submit-btn-spinner');
        this.submitButton?.classList?.add('invisible');
        submitButtonSpinner?.classList?.remove('d-none');
        this.form?.classList?.add('pointer-events-none')
    }

    showHideLoader(show: boolean) { // main page loader set
        const loaderElement = document.querySelector('.create-card-section .main-loader');
        const cardFormElement = document.querySelector('.create-card-section #card-form');
        if (show) {
            loaderElement?.classList?.remove('d-none');
            cardFormElement?.classList?.add('d-none');
        } else {
            loaderElement?.classList?.add('d-none');
            cardFormElement?.classList?.remove('d-none');
        }
    }
}