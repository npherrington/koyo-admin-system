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
  Speech,
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
  empathyScore: "unacceptable" | "acceptable" | "good" | null;
  empathyNumericScore: number | null;
  qstarScore: "unacceptable" | "acceptable" | "good" | null;
  qstarNumericScore: number | null;
  messageAlerted: boolean;
}

const ReviewConsultation = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [unacceptableNotes, setUnacceptableNotes] = useState(new Map());

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
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 2,
      sender: "doctor",
      content:
        "Hello Michael, I’m sorry to hear about your irritation. Let’s take a closer look at the affected areas and discuss your skincare routine. It may be linked to something you're using or a condition we need to treat.",
      timestamp: "2024-01-18T09:05:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 3,
      sender: "patient",
      content:
        "I’ve been using the same skincare routine for a while now, but I’m not sure if it’s causing the irritation. I’ll show you my products when I come in.",
      timestamp: "2024-01-18T09:10:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 4,
      sender: "doctor",
      content:
        "Great, we’ll review your products during the consultation. Based on the irritation's appearance, I think a new topical treatment will help. I’ll prescribe something specific to your condition.",
      timestamp: "2024-01-18T09:15:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 5,
      sender: "patient",
      content:
        "I’ve tried a few different treatments before, but they didn’t work. I’m hopeful that this one will make a difference. I just wish I had more details about the options.",
      timestamp: "2024-01-18T09:20:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 6,
      sender: "doctor",
      content:
        "I understand your concerns. I’ll explain the treatment in more detail, including how it works and what to expect. It’s important to follow a proper routine to ensure the best results.",
      timestamp: "2024-01-18T09:25:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 7,
      sender: "patient",
      content:
        "Thanks, Dr. Lee. I’ll make sure to follow your advice closely and keep you updated on how it’s going. Can you recommend any specific products to complement the treatment?",
      timestamp: "2024-01-18T09:30:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 8,
      sender: "doctor",
      content:
        "Yes, I’d recommend a gentle cleanser that doesn’t irritate your skin, followed by a non-comedogenic moisturizer. I can suggest a few brands when you come in. I’ll also provide you with a written plan.",
      timestamp: "2024-01-18T09:35:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 9,
      sender: "patient",
      content:
        "That sounds good. I’ve been using a harsh exfoliator lately, and I think that might be contributing to the irritation. I’ll stop using it for now and try the products you suggest.",
      timestamp: "2024-01-18T09:40:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 10,
      sender: "doctor",
      content:
        "I’m glad to hear that. Exfoliating too much can damage the skin barrier, which may worsen the irritation. I’ll also advise you to avoid direct sun exposure during this treatment, as it could make the irritation worse.",
      timestamp: "2024-01-18T09:45:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 11,
      sender: "patient",
      content:
        "I’ll make sure to wear sunscreen and avoid sun exposure. I have a question, though—what if the irritation comes back after I start the treatment? Should I contact you right away?",
      timestamp: "2024-01-18T09:50:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 12,
      sender: "doctor",
      content:
        "Yes, please reach out if you notice any worsening symptoms. We can adjust the treatment if necessary. It’s also important to monitor how your skin reacts during the first week, as it may take some time to see full results.",
      timestamp: "2024-01-18T09:55:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 13,
      sender: "patient",
      content:
        "Got it. I’ll be sure to keep track of any changes and let you know if anything seems off. Thanks again for your help today!",
      timestamp: "2024-01-18T10:00:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 14,
      sender: "doctor",
      content:
        "You’re very welcome, Michael. I’m confident that this treatment will help, but don’t hesitate to reach out if you need anything. I’ll be here to assist you. Take care and I’ll see you at your follow-up appointment.",
      timestamp: "2024-01-18T10:05:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 15,
      sender: "patient",
      content:
        "I’m looking forward to seeing the results! I’ll check back with you soon. Thanks again, Dr. Lee!",
      timestamp: "2024-01-18T10:10:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
    {
      id: 16,
      sender: "doctor",
      content:
        "Take care, Michael! Wishing you all the best with your treatment. I’ll see you soon for the follow-up.",
      timestamp: "2024-01-18T10:15:00Z",
      empathyScore: null,
      empathyNumericScore: null,
      qstarScore: null,
      qstarNumericScore: null,
      messageAlerted: false,
    },
  ]);

  const handleRatingQualityScore = (
    messageId: number,
    qstarScore: "unacceptable" | "acceptable" | "good"
  ) => {
    const numericScore =
      qstarScore === "unacceptable" ? 1 : qstarScore === "acceptable" ? 2 : 3;

    setMessages(
      messages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              qstarScore,
              qstarNumericScore: numericScore,
            }
          : message
      )
    );
  };
  interface CircleRatingProps {
    messageId: number;
    currentRating: "unacceptable" | "acceptable" | "good" | null;
  }

  const CircleRating = ({ messageId, currentRating }: CircleRatingProps) => {
    const { isDarkMode } = useTheme();
    const ratings = [
      { value: "unacceptable", label: "Unacceptable", color: "red" },
      { value: "acceptable", label: "Acceptable", color: "yellow" },
      { value: "good", label: "Good", color: "green" },
    ] as const;

    return (
      <div className="flex items-center space-x-2 mb-1">
        {ratings.map((rating) => (
          <button
            key={rating.value}
            onClick={() => handleRatingQualityScore(messageId, rating.value)}
            className={cn(
              "flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
              currentRating === rating.value
                ? [
                    rating.value === "unacceptable" &&
                      "bg-red-100 text-red-700 border-red-300",
                    rating.value === "acceptable" &&
                      "bg-yellow-100 text-yellow-700 border-yellow-300",
                    rating.value === "good" &&
                      "bg-green-100 text-green-700 border-green-300",
                  ]
                : isDarkMode
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            <Speech
              className={cn(
                "w-4 h-4 mr-1",
                currentRating === rating.value
                  ? [
                      rating.value === "unacceptable" && "text-red-500",
                      rating.value === "acceptable" && "text-yellow-500",
                      rating.value === "good" && "text-green-500",
                    ]
                  : isDarkMode
                  ? "text-white"
                  : "text-gray-400"
              )}
            />
            {rating.label}
          </button>
        ))}
      </div>
    );
  };

  const handleRatingEmpathyScore = (
    messageId: number,
    empathyScore: "unacceptable" | "acceptable" | "good"
  ) => {
    const numericScore =
      empathyScore === "unacceptable"
        ? 1
        : empathyScore === "acceptable"
        ? 2
        : 3;

    setMessages(
      messages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              empathyScore,
              empathyNumericScore: numericScore,
            }
          : message
      )
    );
  };

  interface HeartRatingProps {
    messageId: number;
    currentRating: "unacceptable" | "acceptable" | "good" | null;
  }

  const HeartRating = ({ messageId, currentRating }: HeartRatingProps) => {
    const { isDarkMode } = useTheme();
    const ratings = [
      { value: "unacceptable", label: "Unacceptable", color: "red" },
      { value: "acceptable", label: "Acceptable", color: "yellow" },
      { value: "good", label: "Good", color: "green" },
    ] as const;

    return (
      <div className="flex items-center space-x-2 mb-1">
        {ratings.map((rating) => (
          <button
            key={rating.value}
            onClick={() => handleRatingEmpathyScore(messageId, rating.value)}
            className={cn(
              "flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
              currentRating === rating.value
                ? [
                    rating.value === "unacceptable" &&
                      "bg-red-100 text-red-700 border-red-300",
                    rating.value === "acceptable" &&
                      "bg-yellow-100 text-yellow-700 border-yellow-300",
                    rating.value === "good" &&
                      "bg-green-100 text-green-700 border-green-300",
                  ]
                : isDarkMode
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            <Heart
              className={cn(
                "w-4 h-4 mr-1",
                currentRating === rating.value
                  ? [
                      rating.value === "unacceptable" && "text-red-500",
                      rating.value === "acceptable" && "text-yellow-500",
                      rating.value === "good" && "text-green-500",
                    ]
                  : isDarkMode
                  ? "text-white"
                  : "text-gray-400"
              )}
            />
            {rating.label}
          </button>
        ))}
      </div>
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
    const empathyRatings = doctorMessages
      .map((m) => m.empathyScore)
      .filter(Boolean) as ("unacceptable" | "acceptable" | "good")[];
    const qstarRatings = doctorMessages
      .map((m) => m.qstarScore)
      .filter(Boolean) as ("unacceptable" | "acceptable" | "good")[];

    const empathyNumericScores = doctorMessages
      .map((m) => m.empathyNumericScore)
      .filter(Boolean) as number[];

    const qstarNumericScores = doctorMessages
      .map((m) => m.qstarNumericScore)
      .filter(Boolean) as number[];

    const totalEmpathyRatings = empathyRatings.length;
    const totalQstarRatings = qstarRatings.length;

    // Calculate numeric averages
    const averageEmpathyNumeric =
      empathyNumericScores.length > 0
        ? (
            empathyNumericScores.reduce((a, b) => a + b, 0) /
            empathyNumericScores.length
          ).toFixed(2)
        : "0";

    const averageQstarNumeric =
      qstarNumericScores.length > 0
        ? (
            qstarNumericScores.reduce((a, b) => a + b, 0) /
            qstarNumericScores.length
          ).toFixed(2)
        : "0";

    const empathyCounts = {
      unacceptable: empathyRatings.filter((r) => r === "unacceptable").length,
      acceptable: empathyRatings.filter((r) => r === "acceptable").length,
      good: empathyRatings.filter((r) => r === "good").length,
    };

    const qstarCounts = {
      unacceptable: qstarRatings.filter((r) => r === "unacceptable").length,
      acceptable: qstarRatings.filter((r) => r === "acceptable").length,
      good: qstarRatings.filter((r) => r === "good").length,
    };

    const empathyPercentages = {
      unacceptable:
        totalEmpathyRatings > 0
          ? ((empathyCounts.unacceptable / totalEmpathyRatings) * 100).toFixed(
              1
            )
          : "0",
      acceptable:
        totalEmpathyRatings > 0
          ? ((empathyCounts.acceptable / totalEmpathyRatings) * 100).toFixed(1)
          : "0",
      good:
        totalEmpathyRatings > 0
          ? ((empathyCounts.good / totalEmpathyRatings) * 100).toFixed(1)
          : "0",
    };

    const qstarPercentages = {
      unacceptable:
        totalQstarRatings > 0
          ? ((qstarCounts.unacceptable / totalQstarRatings) * 100).toFixed(1)
          : "0",
      acceptable:
        totalQstarRatings > 0
          ? ((qstarCounts.acceptable / totalQstarRatings) * 100).toFixed(1)
          : "0",
      good:
        totalQstarRatings > 0
          ? ((qstarCounts.good / totalQstarRatings) * 100).toFixed(1)
          : "0",
    };

    // Find most common ratings
    const mostCommonEmpathy = Object.entries(empathyCounts).reduce(
      (prev, curr) => (prev[1] > curr[1] ? prev : curr)
    )[0] as "unacceptable" | "acceptable" | "good";

    const mostCommonQstar = Object.entries(qstarCounts).reduce((prev, curr) =>
      prev[1] > curr[1] ? prev : curr
    )[0] as "unacceptable" | "acceptable" | "good";

    return {
      averageEmpathy: mostCommonEmpathy,
      averageQstar: mostCommonQstar,
      empathyCounts,
      qstarCounts,
      empathyPercentages,
      qstarPercentages,
      totalEmpathyRated: totalEmpathyRatings,
      totalQstarRated: totalQstarRatings,
      averageEmpathyNumeric,
      averageQstarNumeric,
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

  const getMessagesWithUnacceptableRatings = useMemo(() => {
    return messages.filter(
      (message) =>
        message.sender === "doctor" &&
        (message.empathyScore === "unacceptable" ||
          message.qstarScore === "unacceptable")
    );
  }, [messages]);

  const handleUnacceptableNote = (messageId: number, note: string) => {
    setUnacceptableNotes((prev) => {
      const newNotes = new Map(prev);
      newNotes.set(messageId, note);
      return newNotes;
    });
  };

  const areAllUnacceptableNotesComplete = useMemo(() => {
    const messagesWithUnacceptable = getMessagesWithUnacceptableRatings;
    return messagesWithUnacceptable.every(
      (message) =>
        unacceptableNotes.has(message.id) &&
        unacceptableNotes.get(message.id).trim().length > 0
    );
  }, [getMessagesWithUnacceptableRatings, unacceptableNotes]);

  const isConfirmDisabled = useMemo(() => {
    return (
      getMessagesWithUnacceptableRatings.length > 0 &&
      !areAllUnacceptableNotesComplete
    );
  }, [getMessagesWithUnacceptableRatings, areAllUnacceptableNotesComplete]);

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
                  <p className="ext-xl font-bold">Patient Rating</p>
                  <ConsultationRating
                    rating={consultationSummary.patientRating}
                  />
                </div>
                <div className="p-3 rounded-lg">
                  <p className="text-sm mb-1 font-semibold">Patient Feedback</p>
                  <p className="text-sm">
                    {consultationSummary.patientFeedback}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xl font-bold">Average Empathy Score</p>
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-red-400 mr-2" />
                    <span className="text-lg font-semibold">
                      {calculateAverages.averageEmpathy}
                    </span>
                    <span className="ml-1 font-bold">
                      ({calculateAverages.averageEmpathyNumeric})
                    </span>
                  </div>
                  <div className="text-sm">
                    <p>
                      Good: {calculateAverages.empathyCounts.good} (
                      {calculateAverages.empathyPercentages.good}%)
                    </p>
                    <p>
                      Acceptable: {calculateAverages.empathyCounts.acceptable} (
                      {calculateAverages.empathyPercentages.acceptable}%)
                    </p>
                    <p>
                      Unacceptable:{" "}
                      {calculateAverages.empathyCounts.unacceptable} (
                      {calculateAverages.empathyPercentages.unacceptable}%)
                    </p>
                    <p className="mt-1">
                      Total Rated: {calculateAverages.totalEmpathyRated}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xl font-bold">
                      Average Communication Score
                    </p>
                    <div className="flex items-center">
                      <Speech className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-lg font-semibold">
                        {calculateAverages.averageQstar}
                      </span>
                      <span className="ml-1 font-bold">
                        ({calculateAverages.averageQstarNumeric})
                      </span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>
                      Good: {calculateAverages.qstarCounts.good} (
                      {calculateAverages.qstarPercentages.good}%)
                    </p>
                    <p>
                      Acceptable: {calculateAverages.qstarCounts.acceptable} (
                      {calculateAverages.qstarPercentages.acceptable}%)
                    </p>
                    <p>
                      Unacceptable: {calculateAverages.qstarCounts.unacceptable}{" "}
                      ({calculateAverages.qstarPercentages.unacceptable}%)
                    </p>
                    <p className="mt-1">
                      Total Rated: {calculateAverages.totalQstarRated}
                    </p>
                  </div>
                </div>
                {getMessagesWithUnacceptableRatings.length > 0 && (
                  <div className="space-y-4 mb-6">
                    <p className="text-m flex items-center text-red-600 font-medium">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Messages with Unacceptable Ratings (
                      {getMessagesWithUnacceptableRatings.length})
                    </p>
                    {getMessagesWithUnacceptableRatings.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          isDarkMode
                            ? "bg-gray-800 border-red-800"
                            : "bg-red-50 border-red-200"
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
                            <div className="flex space-x-4">
                              <div className="flex items-center">
                                <Heart
                                  className={cn(
                                    "w-4 h-4 mr-1",
                                    message.empathyScore === "unacceptable"
                                      ? "text-red-500"
                                      : "text-gray-400"
                                  )}
                                />
                                <span
                                  className={
                                    message.empathyScore === "unacceptable"
                                      ? "text-red-500"
                                      : ""
                                  }
                                >
                                  Empathy: {message.empathyScore}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Speech
                                  className={cn(
                                    "w-4 h-4 mr-1",
                                    message.qstarScore === "unacceptable"
                                      ? "text-red-500"
                                      : "text-gray-400"
                                  )}
                                />
                                <span
                                  className={
                                    message.qstarScore === "unacceptable"
                                      ? "text-red-500"
                                      : ""
                                  }
                                >
                                  Communication: {message.qstarScore}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm flex items-center">
                                <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                                Reason for Unacceptable Rating
                              </p>
                              <Textarea
                                value={unacceptableNotes.get(message.id) || ""}
                                onChange={(e) =>
                                  handleUnacceptableNote(
                                    message.id,
                                    e.target.value
                                  )
                                }
                                placeholder="Please explain why this message received an unacceptable rating..."
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
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  className="bg-red-700 hover:bg-red-800"
                  onClick={() => setShowOverlay(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSubmit}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isConfirmDisabled}
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
