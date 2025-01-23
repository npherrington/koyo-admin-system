import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  User,
  Bot,
  Loader2,
  Thermometer,
  Hash,
  Layers,
  MessageSquare,
  Wand2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "./ui/side-bar";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Model {
  id: string;
  name: string;
  description: string;
}

interface ModelParameterProps {
  icon: React.ElementType;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const AiWorkflows = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("welcome");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Model parameters
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [topK, setTopK] = useState(40);
  const [maxTokens, setMaxTokens] = useState(1000);

  const models = [
    {
      id: "welcome",
      name: "Welcome Assistant",
      description: "Helps create welcoming messages",
    },
    {
      id: "summary",
      name: "Summary Generator",
      description: "Creates concise summaries",
    },
    {
      id: "magic-glossary",
      name: "Magic Glossary",
      description: "Generates detailed explanations",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    setMessages([]); // Clear chat history when model changes
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const selectedModelData = models.find((m) => m.id === selectedModel);
    if (!selectedModelData) return;

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: `[${selectedModelData.name}] This is a simulated response with parameters: Temperature: ${temperature}, Top-P: ${topP}, Top-K: ${topK}, Max Tokens: ${maxTokens}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const ModelParameter: React.FC<ModelParameterProps> = ({
    icon: Icon,
    label,
    value,
    onChange,
    min,
    max,
    step,
  }) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-500" />
        <Label className="text-sm text-gray-600">{label}</Label>
        <span className="ml-auto text-sm text-gray-600">{value}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(value) => onChange(value[0])}
        max={max}
        min={min}
        step={step}
        className="w-full"
      />
    </div>
  );

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
    <div
      className={`flex gap-3 mb-4 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[80%] ${
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            message.role === "user" ? "bg-orange-100" : "bg-blue-100"
          }`}
        >
          {message.role === "user" ? (
            <User className="w-4 h-4 text-orange-600" />
          ) : (
            <Bot className="w-4 h-4 text-blue-600" />
          )}
        </div>
        <div
          className={`rounded-lg p-3 ${
            message.role === "user"
              ? "bg-orange-100 text-black"
              : "bg-gray-100 text-black"
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeSection="AI Workflows" />
      <Card className="w-full max-w-4xl mx-auto my-6 bg-white">
        <CardHeader className="border-b bg-slate-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-orange-600">
              <h1 className="text-xl">AI Workflows</h1>
              <p className="text-xs text-gray-400">Test our KOYO agents</p>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-gray-500" />
              <Select value={selectedModel} onValueChange={handleModelChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex flex-col">
                        <span>{model.name}</span>
                        {/* <span className="text-xs scale-75 text-gray-500">
                          {model.description}
                        </span> */}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-[600px]">
            <ScrollArea className="flex-1 p-4">
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
              {isLoading && (
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="rounded-lg p-3 bg-gray-100">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="border-t p-4 bg-slate-50">
              <div className="flex gap-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 p-4 border rounded-lg bg-gray-50">
                <ModelParameter
                  icon={Thermometer}
                  label="Temperature"
                  value={temperature}
                  onChange={setTemperature}
                  min={0}
                  max={1}
                  step={0.1}
                />
                <ModelParameter
                  icon={Hash}
                  label="Top-P"
                  value={topP}
                  onChange={setTopP}
                  min={0}
                  max={1}
                  step={0.1}
                />
                <ModelParameter
                  icon={Layers}
                  label="Top-K"
                  value={topK}
                  onChange={setTopK}
                  min={1}
                  max={100}
                  step={1}
                />
                <ModelParameter
                  icon={MessageSquare}
                  label="Max Tokens"
                  value={maxTokens}
                  onChange={setMaxTokens}
                  min={1}
                  max={4000}
                  step={100}
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiWorkflows;
