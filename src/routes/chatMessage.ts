import { Router } from 'express';
import ChatMessageController from '../controllers/chatMessage'; // Using the ChatMessageController Object Instance

const router = Router();

// GET all chat messages
router.get('/', ChatMessageController.getAllChatMessages);

// GET chat message by ID
router.get('/:id', ChatMessageController.getChatMessageById);

// CREATE a new chat message
router.post('/', ChatMessageController.createChatMessage);

// UPDATE chat message by ID
router.put('/:id', ChatMessageController.updateChatMessage);

// DELETE chat message by ID
router.delete('/:id', ChatMessageController.deleteChatMessage);

export default router;
