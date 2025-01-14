import React, { useState } from "react";
import { User, Star, Cpu, Clock, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReviewConsultation = () => {
  // Mock chat data with message ratings
  const consultationSummary = {
    id: "C-1236",
    patientName: "Michael Davis",
    doctorName: "Dr. Sarah Lee",
    date: "2024-01-18",
    duration: "28m",
    status: "completed",
    type: "Dermatology Consultation",
    rating: 4,
    summary:
      "Michael visited Dr. Sarah Lee to address ongoing skin irritation. Dr. Lee prescribed a new topical treatment and advised on proper skincare routines. Michael found the consultation helpful, though he felt the treatment options could have been explained in more detail. He rated the consultation a 4 out of 5.",
  };
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "patient",
      content:
        "Hi Dr. Lee, I’ve been dealing with ongoing skin irritation on my arms and face for a few weeks now. It’s getting uncomfortable, and I was hoping you could help me with this.",
      timestamp: "2024-01-18T09:00:00Z",
    },
    {
      id: 2,
      sender: "doctor",
      content:
        "Hello Michael, I’m sorry to hear about your irritation. Let’s take a closer look at the affected areas and discuss your skincare routine. It may be linked to something you're using or a condition we need to treat.",
      timestamp: "2024-01-18T09:05:00Z",
    },
    {
      id: 3,
      sender: "patient",
      content:
        "I’ve been using the same skincare routine for a while now, but I’m not sure if it’s causing the irritation. I’ll show you my products when I come in.",
      timestamp: "2024-01-18T09:10:00Z",
    },
    {
      id: 4,
      sender: "doctor",
      content:
        "Great, we’ll review your products during the consultation. Based on the irritation's appearance, I think a new topical treatment will help. I’ll prescribe something specific to your condition.",
      timestamp: "2024-01-18T09:15:00Z",
    },
    {
      id: 5,
      sender: "patient",
      content:
        "I’ve tried a few different treatments before, but they didn’t work. I’m hopeful that this one will make a difference. I just wish I had more details about the options.",
      timestamp: "2024-01-18T09:20:00Z",
    },
    {
      id: 6,
      sender: "doctor",
      content:
        "I understand your concerns. I’ll explain the treatment in more detail, including how it works and what to expect. It’s important to follow a proper routine to ensure the best results.",
      timestamp: "2024-01-18T09:25:00Z",
    },
    {
      id: 7,
      sender: "patient",
      content:
        "Thanks, Dr. Lee. I’ll make sure to follow your advice closely and keep you updated on how it’s going. Can you recommend any specific products to complement the treatment?",
      timestamp: "2024-01-18T09:30:00Z",
    },
    {
      id: 8,
      sender: "doctor",
      content:
        "Yes, I’d recommend a gentle cleanser that doesn’t irritate your skin, followed by a non-comedogenic moisturizer. I can suggest a few brands when you come in. I’ll also provide you with a written plan.",
      timestamp: "2024-01-18T09:35:00Z",
    },
    {
      id: 9,
      sender: "patient",
      content:
        "That sounds good. I’ve been using a harsh exfoliator lately, and I think that might be contributing to the irritation. I’ll stop using it for now and try the products you suggest.",
      timestamp: "2024-01-18T09:40:00Z",
    },
    {
      id: 10,
      sender: "doctor",
      content:
        "I’m glad to hear that. Exfoliating too much can damage the skin barrier, which may worsen the irritation. I’ll also advise you to avoid direct sun exposure during this treatment, as it could make the irritation worse.",
      timestamp: "2024-01-18T09:45:00Z",
    },
    {
      id: 11,
      sender: "patient",
      content:
        "I’ll make sure to wear sunscreen and avoid sun exposure. I have a question, though—what if the irritation comes back after I start the treatment? Should I contact you right away?",
      timestamp: "2024-01-18T09:50:00Z",
    },
    {
      id: 12,
      sender: "doctor",
      content:
        "Yes, please reach out if you notice any worsening symptoms. We can adjust the treatment if necessary. It’s also important to monitor how your skin reacts during the first week, as it may take some time to see full results.",
      timestamp: "2024-01-18T09:55:00Z",
    },
    {
      id: 13,
      sender: "patient",
      content:
        "Got it. I’ll be sure to keep track of any changes and let you know if anything seems off. Thanks again for your help today!",
      timestamp: "2024-01-18T10:00:00Z",
    },
    {
      id: 14,
      sender: "doctor",
      content:
        "You’re very welcome, Michael. I’m confident that this treatment will help, but don’t hesitate to reach out if you need anything. I’ll be here to assist you. Take care and I’ll see you at your follow-up appointment.",
      timestamp: "2024-01-18T10:05:00Z",
    },
    {
      id: 15,
      sender: "patient",
      content:
        "I’m looking forward to seeing the results! I’ll check back with you soon. Thanks again, Dr. Lee!",
      timestamp: "2024-01-18T10:10:00Z",
    },
    {
      id: 16,
      sender: "doctor",
      content:
        "Take care, Michael! Wishing you all the best with your treatment. I’ll see you soon for the follow-up.",
      timestamp: "2024-01-18T10:15:00Z",
    },
  ]);

  const handleRating = (messageId, rating) => {
    setMessages(
      messages.map((message) =>
        message.id === messageId ? { ...message, rating } : message
      )
    );
  };

  const StarRating = ({ messageId, currentRating }) => {
    const [hover, setHover] = useState(0);

    return (
      <div className="flex items-center space-x-1 mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(messageId, star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <Star
              className={`w-4 h-4 ${
                star <= (hover || currentRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };
  const ConsultationRating = ({ rating }) => (
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
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Consultation Chat</CardTitle>
          <span className="text-sm text-gray-500">
            Doctor Assigned: Dr Joe Blogs
          </span>
        </div>
      </CardHeader>
      {/* Consultation Summary Section */}
      <div className="border-b p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Patient
            </p>
            <p className="font-medium">{consultationSummary.patientName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Doctor
            </p>
            <p className="font-medium">{consultationSummary.doctorName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Type
            </p>
            <p className="font-medium">{consultationSummary.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Date
            </p>
            <p className="font-medium">{consultationSummary.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Duration
            </p>
            <p className="font-medium">{consultationSummary.duration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Rating
            </p>
            <ConsultationRating rating={consultationSummary.rating} />
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Summary</p>
          <p className="text-sm">{consultationSummary.summary}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "doctor" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] ${
                  message.sender === "doctor" ? "order-last" : "order-first"
                }`}
              >
                {message.sender === "doctor" && (
                  <StarRating
                    messageId={message.id}
                    currentRating={message.rating}
                  />
                )}
                <div className="flex items-start space-x-2">
                  {message.sender === "doctor" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          <Cpu className="w-5 h-5 text-gray-700" />{" "}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "doctor"
                        ? "bg-white border border-gray-200"
                        : "bg-orange-600 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "doctor"
                          ? "text-gray-500"
                          : "text-orange-100"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
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
    </Card>
  );
};

export default ReviewConsultation;
