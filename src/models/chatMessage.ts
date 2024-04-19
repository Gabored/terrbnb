import { Schema, Document, model, Model } from 'mongoose';

interface ChatMessage extends Document {
  _id: Schema.Types.ObjectId;
  propertyId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  message: string;
  timestamp: Date;
}

interface ChatMessageModel extends Model<ChatMessage> {
  getAllChatMessages(): Promise<ChatMessage[]>;
  getChatMessageById(chatMessageId: string): Promise<ChatMessage | null>;
  createChatMessage(chatMessageData: ChatMessage): Promise<ChatMessage>;
  updateChatMessage(chatMessageId: string, updateData: Partial<ChatMessage>): Promise<ChatMessage | null>;
  deleteChatMessage(chatMessageId: string): Promise<ChatMessage | null>;
}

const chatMessageSchema: Schema<ChatMessage> = new Schema({
  propertyId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

chatMessageSchema.statics.getAllChatMessages = async function (): Promise<ChatMessage[]> {
  return this.find();
};

chatMessageSchema.statics.getChatMessageById = async function (chatMessageId: string): Promise<ChatMessage | null> {
  return this.findById(chatMessageId);
};

chatMessageSchema.statics.createChatMessage = async function (chatMessageData: ChatMessage): Promise<ChatMessage> {
  return this.create(chatMessageData);
};

chatMessageSchema.statics.updateChatMessage = async function (chatMessageId: string, updateData: Partial<ChatMessage>): Promise<ChatMessage | null> {
  return this.findByIdAndUpdate(chatMessageId, updateData, { new: true });
};

chatMessageSchema.statics.deleteChatMessage = async function (chatMessageId: string): Promise<ChatMessage | null> {
  return this.findByIdAndDelete(chatMessageId);
};

export const ChatMessageModel: ChatMessageModel = model<ChatMessage, ChatMessageModel>('ChatMessage', chatMessageSchema);
