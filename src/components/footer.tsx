import { AppBar, Toolbar, Box, Typography, useTheme, Container } from "@mui/material";
import { GithubIcon, TwitterIcon, MessageCircle } from "lucide-react";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <AppBar
      position="static"
      component="footer"
      sx={{
        background: isDark
          ? "linear-gradient(90deg, #2c2c54, #1e3a8a 60%, #0bc9e8)"
          : "linear-gradient(90deg, #646cff, #3b82f6 60%, #61dafb)",
        color: "white",
        boxShadow: "none",
        mt: "auto",
        minWidth: "99.2vw",
        overflowX: "hidden",
        position: "relative",
        zIndex: 1300,
      }}
    >
        <Container maxWidth="lg">
      <Toolbar
        sx={{
          flexDirection: "column",
          alignItems: "stretch",
          py: 6,
          px: { xs: 3, sm: 4, md: 6 },
          width: "100%",
        }}
      >
        {/* Brand/Intro */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
            mb: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
              fontFamily: "'Poppins', 'Segoe UI', sans-serif",
              letterSpacing: 1,
            }}
          >
            <Box component="span" sx={{ color: "#646cff" }}>
              ⚡
            </Box>
            StackGen
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            Scaffold smarter, build faster.
          </Typography>
        </Box>

        {/* Personal Dev Info / Disclaimer / Contact, etc. */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
            mb: 4,
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
            <strong>Built and maintained by a solo developer.</strong> This is a personal project, not a corporate product.
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
            You can find the source and documentation on{" "}
            <a
              href="https://github.com/seanmkhabela/stackgen"
              style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
            >
              GitHub
            </a>
            .
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
            For questions, feedback or collaboration, reach out at{" "}
            <a
              href="mailto:seanmkhabela@icloud.com"
              style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
            >
              seanmkhabela@icloud.com
            </a>
            .
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
            Disclaimer: Provided “as is,” without warranty of any kind.
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            <em>Version: 1.0.0</em>
          </Typography>
        </Box>

          {/* Bottom section with legal & icons */}
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.2)",
              pt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": {
                    color: "white",
                    cursor: "pointer",
                  },
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": {
                    color: "white",
                    cursor: "pointer",
                  },
                }}
              >
                Privacy Policy
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <TwitterIcon
                size={20}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                }}
              />
              <GithubIcon
                size={20}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                }}
              />
              <MessageCircle
                size={20}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "right",
              mt: 2,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "1200px",
              mx: "auto",
              width: "100%",
            }}
          >
            © {new Date().getFullYear()} StackGen, Inc.
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
