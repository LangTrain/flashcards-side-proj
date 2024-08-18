"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Grid,
} from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { getStripe } from "../utils/get-stripe";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add additional headers as needed
      },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <main>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          href="/flashcard"
        >
          Stored Flashcards
        </Button>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Support Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Support Us Here
          </Button>
        </Grid>
      </Box>
    </main>
  );
}
