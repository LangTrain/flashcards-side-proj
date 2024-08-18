"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(
          `/api/checkout_sessions?session_id=${session_id}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occurred while retrieving the session.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  useEffect(() => {
    if (!loading) {
      if (session && session.payment_status === "paid") {
        // Redirect after a delay to show the message
        const timer = setTimeout(() => {
          router.push("/"); // Redirect to home page after payment success
        }, 5000); // Adjust delay as needed

        return () => clearTimeout(timer); // Cleanup timer on unmount
      } else if (error) {
        // Redirect after a delay if there is an error
        const timer = setTimeout(() => {
          router.push("/"); // Redirect to home page after error
        }, 5000); // Adjust delay as needed

        return () => clearTimeout(timer); // Cleanup timer on unmount
      }
    }
  }, [loading, session, error]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Your payment was not successful. Redirecting you to the home page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/")}
            sx={{ mt: 2 }}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      {session.payment_status === "paid" ? (
        <>
          <Typography variant="h4">Thank you for your purchase!</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Session ID: {session_id}</Typography>
            <Typography variant="body1">
              We have received your payment. You will receive an email with the
              order details shortly.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4">Payment failed</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Your payment was not successful. You can go back to the home page.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/")}
              sx={{ mt: 2 }}
            >
              Go to Home
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
