import { Dialog as DialogPrimitive } from 'bits-ui';

import Content from './dialog-content.svelte';
import Overlay from './dialog-overlay.svelte';

const Root = DialogPrimitive.Root;
const Trigger = DialogPrimitive.Trigger;
const Close = DialogPrimitive.Close;
const Portal = DialogPrimitive.Portal;

export {
	Close,
	Content,
	//
	Root as Dialog,
	Close as DialogClose,
	Content as DialogContent,
	Overlay as DialogOverlay,
	Portal as DialogPortal,
	Trigger as DialogTrigger,
	Overlay,
	Portal,
	Root,
	Trigger
};
