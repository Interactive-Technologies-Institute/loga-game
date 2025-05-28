import Shepherd from 'shepherd.js';
import { offset } from '@floating-ui/dom';
import { m } from '@src/paraglide/messages';
import 'shepherd.js/dist/css/shepherd.css';
import './custom-css.css';

export function createGameTour() {
	const tour = new Shepherd.Tour({
		useModalOverlay: true,
		defaultStepOptions: {
			cancelIcon: {
				enabled: true
			},

			modalOverlayOpeningPadding: 16,
			modalOverlayOpeningRadius: 32,

			when: {
				show() {
					const currentStep = Shepherd.activeTour?.getCurrentStep();
					const currentStepElement = currentStep?.getElement();
					const footer = currentStepElement?.querySelector('.shepherd-footer');
					const progress = document.createElement('span');
					progress.className = 'shepherd-progress';
					// @ts-expect-error: 'steps' may not exist on 'activeTour', but we are handling it safely with optional chaining
					progress.innerText = `${Shepherd.activeTour?.steps.indexOf(currentStep) + 1} of ${Shepherd.activeTour?.steps.length}`;
					footer?.insertBefore(
						progress,
						// @ts-expect-error: 'querySelector' may return null, but we are handling it safely
						currentStepElement.querySelector('.shepherd-button:last-child')
					);
				}
			}
		}
	});

	tour.addSteps([
		{
			id: 'welcome',
			title: m.welcome(),
			text: m.welcome_description(),
			buttons: [
				{
					text: 'Skip',
					action: tour.cancel,
					secondary: true
				},
				{
					text: m.continue(),
					action: tour.next
				}
			]
		},
		{
			id: 'map',
			title: m.map(),
			text: m.map_description(),
			attachTo: {
				element: '.map-highlight',
				on: 'bottom'
			},
			buttons: [
				{
					text: 'Skip',
					action: tour.cancel,
					secondary: true
				},
				{
					text: m.continue(),
					action: tour.next
				}
			],
			floatingUIOptions: {
				middleware: [offset({ mainAxis: -88 })]
			}
		},
		{
			id: 'round-indicator',
			title: m.round_indicator(),
			text: m.round_indicator_description(),
			attachTo: {
				element: '.round-indicator',
				on: 'auto'
			},
			buttons: [
				{
					text: 'Skip',
					action: tour.cancel,
					secondary: true
				},
				{
					text: m.continue(),
					action: tour.next
				}
			],
			floatingUIOptions: {
				middleware: [offset({ mainAxis: 20 })]
			}
		},
		{
			id: 'story-button',
			title: m.story_sheet(),
			text: m.story_sheet_description(),
			attachTo: {
				element: '.story-button',
				on: 'top'
			},
			buttons: [
				{
					text: 'Skip',
					action: tour.cancel,
					secondary: true
				},
				{
					text: m.continue(),
					action: tour.next
				}
			],
			floatingUIOptions: {
				middleware: [offset({ mainAxis: 20 })]
			}
		},
		{
			id: 'player-badges',
			title: m.player_badge(),
			text: m.player_badge_description(),
			attachTo: {
				element: '.player-badges',
				on: 'bottom'
			},
			buttons: [
				{
					text: 'Skip',
					action: tour.cancel,
					secondary: true
				},
				{
					text: m.continue(),
					action: tour.next
				}
			],
			floatingUIOptions: {
				middleware: [offset({ mainAxis: 20 })]
			}
		},
		{
			id: 'dice',
			title: m.dice(),
			text: m.dice_description(),
			attachTo: {
				element: '.dice',
				on: 'top'
			},
			buttons: [
				{
					text: 'Skip',
					action: tour.cancel,
					secondary: true
				},
				{
					text: m.continue(),
					action: tour.next
				}
			],
			floatingUIOptions: {
				middleware: [offset({ mainAxis: 20 })]
			}
		},
		{
			id: 'help-button',
			title: m.instructions(),
			text: m.instructions_description(),
			attachTo: {
				element: '.help-button',
				on: 'bottom'
			},
			buttons: [
				{
					text: 'Skip',
					action: tour.cancel,
					secondary: true
				},
				{
					text: m.start_playing(),
					action: tour.complete
				}
			],
			floatingUIOptions: {
				middleware: [offset({ mainAxis: 20 })]
			}
		}
	]);

	return tour;
}
