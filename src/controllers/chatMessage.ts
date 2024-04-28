import { Request, Response } from 'express';
import { ChatMessageModel } from '../models/chatMessage';
import { ResponseStatus } from '../utils/response-status';

class ChatMessageController {

  async getAllChatMessages(req: Request, res: Response): Promise<void> {
    try {
      const chatMessages = await ChatMessageModel.find();
      res.send(chatMessages);
    } catch (error) {
      console.error('Error retrieving chat messages:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while retrieving chat messages.');
    }
  }

  async createChatMessage(req: Request, res: Response): Promise<void> {
    try {
      const chatMessageData = req.body;
      const newChatMessage = await ChatMessageModel.create(chatMessageData);
      res.send(newChatMessage);
    } catch (error) {
      console.error('Error creating chat message:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to create chat message');
    }
  }

  async getChatMessageById(req: Request, res: Response): Promise<void> {
    try {
      const chatMessageId = req.params.id;
      const chatMessage = await ChatMessageModel.findById(chatMessageId);
      if (chatMessage) {
        res.send(chatMessage);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Chat message not found');
      }
    } catch (error) {
      console.error('Error finding chat message by ID:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while finding chat message by ID.');
    }
  }

  async updateChatMessage(req: Request, res: Response): Promise<void> {
    try {
      const chatMessageId = req.params.id;
      const updateData = req.body;
      const updatedChatMessage = await ChatMessageModel.findByIdAndUpdate(chatMessageId, updateData, { new: true });
      if (updatedChatMessage) {
        res.send(updatedChatMessage);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Chat message not found');
      }
    } catch (error) {
      console.error('Error updating chat message:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to update chat message');
    }
  }

  async deleteChatMessage(req: Request, res: Response): Promise<void> {
    try {
      const chatMessageId = req.params.id;
      const deletedChatMessage = await ChatMessageModel.findByIdAndDelete(chatMessageId);
      if (deletedChatMessage) {
        res.send('Chat message deleted successfully!');
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Chat message not found');
      }
    } catch (error) {
      console.error('Error deleting chat message:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to delete chat message');
    }
  }
}

export default new ChatMessageController();
