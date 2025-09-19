import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export function useFeedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFeedback = async (feedback: string, email?: string, page?: string) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/submit-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback,
          email,
          page: page || 'llms-generator',
          category: 'general'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitFeedback,
    isSubmitting
  };
}
