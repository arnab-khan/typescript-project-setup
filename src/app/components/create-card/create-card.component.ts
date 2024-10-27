import { postCard } from '../../../util/apis';
import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './create-card.component.html';
import './create-card.component.scss';

export class AppCreateCardComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-create-card', template);
        this.addEventListeners()
    }

    addEventListeners(): void {
        // Example: Add an event listener to a button with ID 'submit-btn'
        const submitButton = document.getElementById('submit-btn');
        if (submitButton) {
            submitButton.addEventListener('click', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(event: Event): void {
        event.preventDefault();
        console.log('Submit button clicked');
        postCard({
            title: 'my title',
            description: 'my title'
        })
    }
}  