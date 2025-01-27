import * as React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import {
  Star,
  Heart,
  CheckCircle,
  Square,
  CheckSquare,
  Speech,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Consultation {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  duration: string;
  status: string;
  type: string;
  patientRating: number;
  empathyScore: number | null;
  qstarScore: number | null;
  summary: string;
  assignedDoctor: string | null;
}

interface ConsultationItemProps {
  consultation: Consultation;
  onAssignmentToggle: (id: string, event: React.MouseEvent) => void;
  isDarkMode?: boolean;
  onConsultationClick?: () => void;
}

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    "awaiting review": "bg-yellow-100 text-yellow-800",
    reviewed: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    assigned: "bg-purple-100 text-purple-800",
  };
  return styles[status.toLowerCase()] || "bg-gray-100 text-gray-800";
};

const ConsultationItem: React.FC<ConsultationItemProps> = ({
  consultation,
  onAssignmentToggle,
  isDarkMode = false,
}) => {
  const navigate = useNavigate();

  const handleConsultationClick = (event: React.MouseEvent) => {
    // Only navigate if status is assigned and click wasn't on the assignment toggle button
    if (
      consultation.status === "assigned" &&
      !(event.target as HTMLElement).closest("button")
    ) {
      console.log("Assigned consultation clicked");
      navigate("../ReviewConsultation");
    }
  };
  const getAssignmentDetails = (consultation: Consultation) => {
    if (consultation.status === "assigned") {
      return {
        ...consultation,
        assignedDoctor: "Joe Bloggs",
      };
    }
    return consultation;
  };

  const details = getAssignmentDetails(consultation);

  return (
    <div
      className={`p-4 ${
        consultation.status === "assigned" ? "cursor-pointer" : ""
      } ${
        isDarkMode
          ? "hover:bg-orange-500/80 hover:text-white"
          : "hover:bg-orange-500/50"
      }`}
      onClick={handleConsultationClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={(e) => onAssignmentToggle(consultation.id, e)}
            className="hover:bg-gray-100 p-1 rounded"
          >
            {consultation.status === "assigned" ? (
              <CheckSquare className="w-5 h-5 text-blue-500" />
            ) : (
              <Square className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{details.patientName}</h3>
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusBadge(
                  details.status
                )}`}
              >
                {details.status}
              </span>
              {details.assignedDoctor && (
                <span className="ml-2 font-bold">
                  Assigned to: {details.assignedDoctor}
                </span>
              )}
            </div>
            <p className="text-sm">
              {details.type} • {details.date}
            </p>
            <p className="text-sm">{details.doctorName}</p>
            <p className="text-sm">
              <i>{details.summary}</i>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm">{details.patientRating}</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm">{details.empathyScore}</span>
          </div>
          <div className="flex items-center">
            <Speech className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm">{details.qstarScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationItem;
