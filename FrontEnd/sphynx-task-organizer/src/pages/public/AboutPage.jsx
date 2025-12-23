import React from "react";
import tiny from "../../../public/photos/tiny.jpg";
import tiny2 from "../../../public/photos/tiny2.jpg";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";

const AboutPage = () => {
  const images = [
    { img: tiny, title: "Tiny" },
    { img: tiny2, title: "Tiny 2" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box sx={{ pt: 10, pb: 4 }}>
        <Container maxWidth="md">
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                About
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Version:</strong> 1.0.0
              </Typography>

              <Typography variant="body2" sx={{ mb: 3 }}>
                <strong>Sphynx Task Organizer</strong> helps you organize tasks
                efficiently and stay productive.
              </Typography>

              {/* Image section */}
             <ImageList cols={2} gap={16} sx={{ width: "100%", margin: 0 }}>
                    {images.map((item) => (
                        <ImageListItem key={item.title}>
                        <Box
                            component="img"
                            src={item.img}
                            alt={item.title}
                            sx={{
                            width: "100%",
                            height: "auto",
                            maxHeight: 300,
                            objectFit: "contain",
                            borderRadius: 2,
                            backgroundColor: "background.default",
                            }}
                        />
                        </ImageListItem>
                    ))}
                    </ImageList>

            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
