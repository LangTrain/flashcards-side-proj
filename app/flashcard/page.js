"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const searchParams = useSearchParams();
  // const search = searchParams.get("id");

  useEffect(() => {
    console.log("i hit the get flashcard");
    if (!user) return;
    async function getFlashcard() {
      // Ensure `search` and `user` are available and valid

      // Create a reference to the specific collection
      const colRef = collection(
        doc(collection(db, "users"), user.id),
        "flashcardSets"
      );
      console.log(user.id);
      try {
        const docs = await getDocs(colRef);
        const fetchedFlashcards = [];
        docs.forEach((doc) => {
          fetchedFlashcards.push({ id: doc.id, ...doc.data() });
        });
        console.log("Fetched flashcards:", fetchedFlashcards); // Debugging line
        setFlashcards(fetchedFlashcards);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }

    getFlashcard();
  }, [user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return <div> Loading </div>;
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.flatMap((flashcardSet) =>
          flashcardSet.flashcards.map((flashcard) => (
            <Grid item xs={12} sm={6} md={4} key={Math.random()}>
              <Card>
                <CardActionArea
                  onClick={() => handleCardClick(flashcard.front)}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: 200, // Adjust as needed
                        width: 150, // Adjust as needed
                      }}
                    >
                      <Typography variant="h5" component="div">
                        {flipped[flashcard.front]
                          ? flashcard.back
                          : flashcard.front}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
