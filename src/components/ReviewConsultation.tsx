import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  User,
  Star,
  Cpu,
  Clock,
  Calendar,
  FileText,
  ArrowLeft,
  Heart,
  CircleCheck,
  Sidebar,
  AlertTriangle,
  Hourglass,
  Gauge,
  Bot,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Textarea } from "./ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  empathyScore: number | null;
  qstarScore: number | null;
  messageAlerted: boolean;
}

const ReviewConsultation = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [alertedMessages, setAlertedMessages] = useState(new Set());
  const hasAlerts = alertedMessages.size > 0;
  const [alertNotes, setAlertNotes] = useState(new Map());
  const [optimizedMessages, setOptimizedMessages] = useState(new Set());
  const hasOptimizations = optimizedMessages.size > 0;
  const [optimizationNotes, setOptimizationNotes] = useState(new Map());
  const consultationSummary = {
    id: "C-1236",
    patientName: "Michael Davis",
    doctorName: "Dr. Sarah Lee",
    date: "2024-01-18",
    duration: "28m",
    responseTime: "5m",
    status: "awaiting review",
    type: "Dermatology Consultation",
    patientRating: 4,
    patientFeedback:
      "The consultation was helpful but the doctor could have responded faster.",
    empathyScore: null,
    qstarScore: null,
    summary:
      "Michael visited Dr. Sarah Lee to address ongoing skin irritation. Dr. Lee prescribed a new topical treatment and advised on proper skincare routines. Michael found the consultation helpful, though he felt the treatment options could have been explained in more detail. He rated the consultation a 4 out of 5.",
  };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "patient",
      content:
        "Hi Dr. Lee, I’ve been dealing with ongoing skin irritation on my arms and face for a few weeks now. It’s getting uncomfortable, and I was hoping you could help me with this.",
      timestamp: "2024-01-18T09:00:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 2,
      sender: "doctor",
      content:
        "Hello Michael, I’m sorry to hear about your irritation. Let’s take a closer look at the affected areas and discuss your skincare routine. It may be linked to something you're using or a condition we need to treat.",
      timestamp: "2024-01-18T09:05:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 3,
      sender: "patient",
      content:
        "I’ve been using the same skincare routine for a while now, but I’m not sure if it’s causing the irritation. I’ll show you my products when I come in.",
      timestamp: "2024-01-18T09:10:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 4,
      sender: "doctor",
      content:
        "Great, we’ll review your products during the consultation. Based on the irritation's appearance, I think a new topical treatment will help. I’ll prescribe something specific to your condition.",
      timestamp: "2024-01-18T09:15:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 5,
      sender: "patient",
      content:
        "I’ve tried a few different treatments before, but they didn’t work. I’m hopeful that this one will make a difference. I just wish I had more details about the options.",
      timestamp: "2024-01-18T09:20:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 6,
      sender: "doctor",
      content:
        "I understand your concerns. I’ll explain the treatment in more detail, including how it works and what to expect. It’s important to follow a proper routine to ensure the best results.",
      timestamp: "2024-01-18T09:25:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 7,
      sender: "patient",
      content:
        "Thanks, Dr. Lee. I’ll make sure to follow your advice closely and keep you updated on how it’s going. Can you recommend any specific products to complement the treatment?",
      timestamp: "2024-01-18T09:30:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 8,
      sender: "doctor",
      content:
        "Yes, I’d recommend a gentle cleanser that doesn’t irritate your skin, followed by a non-comedogenic moisturizer. I can suggest a few brands when you come in. I’ll also provide you with a written plan.",
      timestamp: "2024-01-18T09:35:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 9,
      sender: "patient",
      content:
        "That sounds good. I’ve been using a harsh exfoliator lately, and I think that might be contributing to the irritation. I’ll stop using it for now and try the products you suggest.",
      timestamp: "2024-01-18T09:40:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 10,
      sender: "doctor",
      content:
        "I’m glad to hear that. Exfoliating too much can damage the skin barrier, which may worsen the irritation. I’ll also advise you to avoid direct sun exposure during this treatment, as it could make the irritation worse.",
      timestamp: "2024-01-18T09:45:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 11,
      sender: "patient",
      content:
        "I’ll make sure to wear sunscreen and avoid sun exposure. I have a question, though—what if the irritation comes back after I start the treatment? Should I contact you right away?",
      timestamp: "2024-01-18T09:50:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 12,
      sender: "doctor",
      content:
        "Yes, please reach out if you notice any worsening symptoms. We can adjust the treatment if necessary. It’s also important to monitor how your skin reacts during the first week, as it may take some time to see full results.",
      timestamp: "2024-01-18T09:55:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 13,
      sender: "patient",
      content:
        "Got it. I’ll be sure to keep track of any changes and let you know if anything seems off. Thanks again for your help today!",
      timestamp: "2024-01-18T10:00:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 14,
      sender: "doctor",
      content:
        "You’re very welcome, Michael. I’m confident that this treatment will help, but don’t hesitate to reach out if you need anything. I’ll be here to assist you. Take care and I’ll see you at your follow-up appointment.",
      timestamp: "2024-01-18T10:05:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 15,
      sender: "patient",
      content:
        "I’m looking forward to seeing the results! I’ll check back with you soon. Thanks again, Dr. Lee!",
      timestamp: "2024-01-18T10:10:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
    {
      id: 16,
      sender: "doctor",
      content:
        "Take care, Michael! Wishing you all the best with your treatment. I’ll see you soon for the follow-up.",
      timestamp: "2024-01-18T10:15:00Z",
      empathyScore: null,
      qstarScore: null,
      messageAlerted: false,
    },
  ]);

  interface AlertTriggerProps {
    messageId: number;
    isAlerted: boolean;
    onToggle: (messageId: number) => void;
  }

  const handleRatingQualityScore = (messageId: number, qstarScore: number) => {
    setMessages(
      messages.map((message) =>
        message.id === messageId ? { ...message, qstarScore } : message
      )
    );
  };

  const handleRatingEmpathyScore = (
    messageId: number,
    empathyScore: number
  ) => {
    setMessages(
      messages.map((message) =>
        message.id === messageId ? { ...message, empathyScore } : message
      )
    );
  };

  interface CircleRatingProps {
    messageId: number;
    currentRating: number | null;
  }

  interface HeartRatingProps {
    messageId: number;
    currentRating: number | null;
  }

  interface OptimizeTriggerProps {
    messageId: number;
    isOptimized: boolean;
    onToggle: (messageId: number) => void;
  }

  const CircleRating = ({ messageId, currentRating }: CircleRatingProps) => {
    const [hover, setHover] = useState(0);

    return (
      <div className="flex items-center space-x-1 mb-1">
        {[1, 2, 3, 4, 5].map((check) => (
          <button
            key={check}
            onClick={() => handleRatingQualityScore(messageId, check)}
            onMouseEnter={() => setHover(check)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <CircleCheck
              className={`w-5 h-5 ${
                check <= (hover || currentRating || 0)
                  ? "fill-green-400 text-black-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };
  const HeartRating = ({ messageId, currentRating }: HeartRatingProps) => {
    const [hover, setHover] = useState(0);

    return (
      <div className="flex items-center space-x-1 mb-1">
        {[1, 2, 3, 4, 5].map((heart) => (
          <button
            key={heart}
            onClick={() => handleRatingEmpathyScore(messageId, heart)}
            onMouseEnter={() => setHover(heart)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <Heart
              className={`w-5 h-5 ${
                heart <= (hover || currentRating || 0)
                  ? "fill-red-400 text-white-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const AlertTrigger: React.FC<AlertTriggerProps> = ({
    messageId,
    isAlerted,
    onToggle,
  }) => (
    <button
      onClick={() => onToggle(messageId)}
      className="focus:outline-none hover:bg-gray-100 p-1 rounded"
    >
      <AlertTriangle
        className={`w-6 h-6 ${
          isAlerted ? "fill-red-400 text-black-400" : "text-gray-400"
        }`}
      />
    </button>
  );

  const handleAlertNote = (messageId: number, note: string) => {
    setAlertNotes((prev) => {
      const newNotes = new Map(prev);
      newNotes.set(messageId, note);
      return newNotes;
    });
  };

  const handleToggleAlert = (messageId: number) => {
    setAlertedMessages((prev) => {
      const newAlerts = new Set(prev);
      if (newAlerts.has(messageId)) {
        newAlerts.delete(messageId);
        // Remove the note when unflagging
        setAlertNotes((prevNotes) => {
          const newNotes = new Map(prevNotes);
          newNotes.delete(messageId);
          return newNotes;
        });
      } else {
        newAlerts.add(messageId);
        // Initialize empty note when flagging
        setAlertNotes((prevNotes) => {
          const newNotes = new Map(prevNotes);
          newNotes.set(messageId, "");
          return newNotes;
        });
      }
      return newAlerts;
    });
  };

  const getAlertedMessages = useMemo(() => {
    return messages.filter((message) => alertedMessages.has(message.id));
  }, [messages, alertedMessages]);

  const areAllAlertNotesComplete = useMemo(() => {
    return Array.from(alertedMessages).every(
      (messageId) =>
        alertNotes.has(messageId) && alertNotes.get(messageId).trim().length > 0
    );
  }, [alertedMessages, alertNotes]);

  const getOptimizedMessages = useMemo(() => {
    return messages.filter((message) => optimizedMessages.has(message.id));
  }, [messages, optimizedMessages]);

  const handleToggleOptimize = (messageId: number) => {
    setOptimizedMessages((prev) => {
      const newOptimized = new Set(prev);
      if (newOptimized.has(messageId)) {
        newOptimized.delete(messageId);
        // Remove the note when unflagging
        setOptimizationNotes((prevNotes) => {
          const newNotes = new Map(prevNotes);
          newNotes.delete(messageId);
          return newNotes;
        });
      } else {
        newOptimized.add(messageId);
        // Initialize empty note when flagging
        setOptimizationNotes((prevNotes) => {
          const newNotes = new Map(prevNotes);
          newNotes.set(messageId, "");
          return newNotes;
        });
      }
      return newOptimized;
    });
  };

  const handleOptimizationNote = (messageId: number, note: string) => {
    setOptimizationNotes((prev) => {
      const newNotes = new Map(prev);
      newNotes.set(messageId, note);
      return newNotes;
    });
  };
  const areAllOptimizationNotesComplete = useMemo(() => {
    return Array.from(optimizedMessages).every(
      (messageId) =>
        optimizationNotes.has(messageId) &&
        optimizationNotes.get(messageId).trim().length > 0
    );
  }, [optimizedMessages, optimizationNotes]);

  const OptimizeTrigger = ({
    messageId,
    isOptimized,
    onToggle,
  }: OptimizeTriggerProps) => {
    return (
      <button
        onClick={() => onToggle(messageId)}
        className="focus:outline-none hover:bg-gray-100 p-1 rounded"
      >
        <Cpu
          className={cn(
            "w-6 h-6",
            isOptimized ? "fill-blue-400 text-black-400" : "text-gray-400"
          )}
        />
      </button>
    );
  };

  interface ConsultationRatingProps {
    rating: number;
  }
  const ConsultationRating: React.FC<ConsultationRatingProps> = ({
    rating,
  }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const calculateAverages = useMemo(() => {
    const doctorMessages = messages.filter(
      (message) => message.sender === "doctor"
    );
    const empathySum = doctorMessages.reduce(
      (sum, message) => sum + (message.empathyScore || 0),
      0
    );
    const qstarSum = doctorMessages.reduce(
      (sum, message) => sum + (message.qstarScore || 0),
      0
    );
    const count = doctorMessages.length;

    return {
      averageEmpathy: (empathySum / count).toFixed(1),
      averageQstar: (qstarSum / count).toFixed(1),
    };
  }, [messages]);

  const areAllMessagesRated = useMemo(() => {
    const doctorMessages = messages.filter(
      (message) => message.sender === "doctor"
    );
    return doctorMessages.every(
      (message) => message.empathyScore !== null && message.qstarScore !== null
    );
  }, [messages]);

  const handleSubmit = () => {
    setShowOverlay(true);
  };

  const onBack = () => {
    navigate("../ClinicalTesting");
  };
  const handleConfirmSubmit = () => {
    navigate("../ClinicalTesting");
  };
  return (
    <div className="relative">
      <div className={showOverlay ? "opacity-50" : ""}>
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="border-b">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex w-full items-center">
                <CardTitle className="flex-1">Consultation Review</CardTitle>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </CardHeader>
          {/* Consultation Summary Section */}
          <div className="border-b p-4 ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Patient
                </p>
                <p className="font-medium">{consultationSummary.patientName}</p>
              </div>
              <div>
                <p className="text-sm flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Doctor
                </p>
                <p className="font-medium">{consultationSummary.doctorName}</p>
              </div>
              <div>
                <p className="text-sm flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Type
                </p>
                <p className="font-medium">{consultationSummary.type}</p>
              </div>
              <div>
                <p className="text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </p>
                <p className="font-medium">{consultationSummary.date}</p>
              </div>
              <div>
                <p className="text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Duration
                </p>
                <p className="font-medium">{consultationSummary.duration}</p>
              </div>
              <div>
                <p className="text-sm flex items-center">
                  <Gauge className="w-4 h-4 mr-2" />
                  Response Time
                </p>
                <p className="font-medium">
                  {consultationSummary.responseTime}
                </p>
              </div>
              <div>
                <p className="text-sm flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Patient Rating
                </p>
                <ConsultationRating
                  rating={consultationSummary.patientRating}
                />
              </div>
            </div>
            <div className="p-3 rounded-lg">
              <p className="text-sm mb-1">Patient Feedback</p>
              <p className="text-sm">{consultationSummary.patientFeedback}</p>
            </div>
            <div className="p-3 rounded-lg">
              <p className="text-sm mb-1">Summary</p>
              <p className="text-sm">{consultationSummary.summary}</p>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "doctor"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.sender === "doctor" ? "order-last" : "order-first"
                    }`}
                  >
                    {message.sender === "doctor" && (
                      <div className="flex justify-between items-center text-gray-800">
                        <div className="flex flex-col">
                          <CircleRating
                            messageId={message.id}
                            currentRating={message.qstarScore}
                          />
                          <HeartRating
                            messageId={message.id}
                            currentRating={message.empathyScore}
                          />
                        </div>
                        <div className="flex gap-1">
                          <AlertTrigger
                            messageId={message.id}
                            isAlerted={alertedMessages.has(message.id)}
                            onToggle={handleToggleAlert}
                          />
                          <OptimizeTrigger
                            messageId={message.id}
                            isOptimized={optimizedMessages.has(message.id)}
                            onToggle={handleToggleOptimize}
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex items-start space-x-2">
                      {message.sender === "doctor" && (
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="" />
                            <AvatarFallback>
                              <Bot className="w-5 h-5 text-gray-600" />{" "}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      <div
                        className={cn(
                          "rounded-lg p-3",
                          message.sender === "doctor"
                            ? isDarkMode
                              ? "bg-blue-900 border border-blue-800 text-white" // Dark mode doctor
                              : "bg-blue-50 border border-blue-100" // Light mode doctor
                            : isDarkMode
                            ? "bg-orange-500/80 text-white" // Dark mode patient
                            : "bg-orange-400 text-white" // Light mode patient
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={cn(
                            "text-xs mt-1",
                            message.sender === "doctor"
                              ? isDarkMode
                                ? "text-blue-200" // Dark mode doctor timestamp
                                : "text-gray-500" // Light mode doctor timestamp
                              : "text-orange-100" // Patient timestamp (both modes)
                          )}
                        >
                          {message.timestamp}
                        </p>
                      </div>{" "}
                      {message.sender === "patient" && (
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-orange-600" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button
              onClick={handleSubmit}
              disabled={!areAllMessagesRated}
              className={`w-full ${
                !areAllMessagesRated
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Submit Review
            </Button>
          </CardFooter>
        </Card>
      </div>
      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="max-h-[80vh] overflow-y-auto">
            {" "}
            {/* Added wrapper div for scrolling */}
            <Card className="w-full max-w-2xl relative my-8">
              <CardHeader className="sticky top-0 border-b z-10">
                <CardTitle>Consultation Review Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm">Patient Rating</p>
                  <ConsultationRating
                    rating={consultationSummary.patientRating}
                  />
                </div>
                <div className="p-3 rounded-lg">
                  <p className="text-sm mb-1">Patient Feedback</p>
                  <p className="text-sm">
                    {consultationSummary.patientFeedback}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">Average Empathy Score</p>
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-red-400 mr-2" />
                    <span className="text-lg font-semibold">
                      {calculateAverages.averageEmpathy}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">Average QSTAR Score</p>
                  <div className="flex items-center">
                    <CircleCheck className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-lg font-semibold">
                      {calculateAverages.averageQstar}
                    </span>
                  </div>
                </div>
                {/* New section for alerted messages */}
                {hasAlerts && (
                  <div className="space-y-4">
                    <p className="text-sm flex items-center">
                      <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                      Flagged Messages ({getAlertedMessages.length})
                    </p>
                    {getAlertedMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          isDarkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-gray-50 border-gray-200"
                        )}
                      >
                        <div className="mb-2">
                          <div className="text-xs mb-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                          <div
                            className={cn(
                              "p-3 rounded-lg mb-3",
                              isDarkMode
                                ? "bg-gray-700 text-gray-200"
                                : "bg-white text-gray-700"
                            )}
                          >
                            {message.content}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500 flex items-center">
                              <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                              Alert Notes
                            </p>
                            <Textarea
                              value={alertNotes.get(message.id) || ""}
                              onChange={(e) =>
                                handleAlertNote(message.id, e.target.value)
                              }
                              placeholder="Please provide details about this alert..."
                              className={cn(
                                "w-full h-24",
                                isDarkMode
                                  ? "bg-gray-700 border-gray-600"
                                  : "bg-white border-gray-200"
                              )}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {hasOptimizations && (
                  <div className="space-y-4">
                    <p className="text-sm flex items-center">
                      <Cpu className="w-4 h-4 text-blue-400 mr-2" />
                      Messages to Optimize ({getOptimizedMessages.length})
                    </p>
                    {getOptimizedMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          isDarkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-gray-50 border-gray-200"
                        )}
                      >
                        <div className="mb-2">
                          <div className="text-xs text-gray-500 mb-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                          <div
                            className={cn(
                              "p-3 rounded-lg mb-3",
                              isDarkMode
                                ? "bg-gray-700 text-gray-200"
                                : "bg-white text-gray-700"
                            )}
                          >
                            {message.content}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500 flex items-center">
                              <Cpu className="w-4 h-4 text-blue-400 mr-2" />
                              Optimization Suggestion
                            </p>
                            <Textarea
                              value={optimizationNotes.get(message.id) || ""}
                              onChange={(e) =>
                                handleOptimizationNote(
                                  message.id,
                                  e.target.value
                                )
                              }
                              placeholder="Please provide suggestions for optimizing this message..."
                              className={cn(
                                "w-full h-24",
                                isDarkMode
                                  ? "bg-gray-700 border-gray-600"
                                  : "bg-white border-gray-200"
                              )}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowOverlay(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSubmit}
                  disabled={
                    (hasAlerts && !areAllAlertNotesComplete) ||
                    (hasOptimizations && !areAllOptimizationNotesComplete)
                  }
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Confirm
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewConsultation;
