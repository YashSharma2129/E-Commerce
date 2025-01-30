import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "../UI/CommonStyle.js";
import Spinner from "../UI/Spinner.js";
import AuthContext from "../store/auth-context";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from '@mui/icons-material/Home';
import { styled } from "@mui/material/styles";
import { Paper, Grid, Typography, Avatar, Tooltip, Box, Fade } from "@mui/material";

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: "20px",
  margin: "10px 0",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
}));

const UserCard = styled(Paper)(({ theme }) => ({
  padding: "30px",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  borderRadius: "15px",
  marginBottom: "30px",
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: "10px",
  padding: "12px 24px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  borderRadius: "30px",
  transition: "all 0.3s ease",
  backgroundColor: "#1a237e",
  color: "white",
  boxShadow: "0 4px 6px rgba(26, 35, 126, 0.2)",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "#283593",
    boxShadow: "0 6px 12px rgba(26, 35, 126, 0.3)",
  },
}));

const FooterActions = styled(Box)(({ theme }) => ({
  position: "sticky",
  bottom: 20,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 -5px 20px rgba(0,0,0,0.1)",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  margin: "40px auto",
  maxWidth: "600px",
}));

export default function UserInfo() {
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState([]);
  const [allUserState, setAllUserState] = useState([]);

  const auth = useContext(AuthContext);
  const currentUserId = auth.userId;

  const fetchData = async () => {
    try {
      const result = await fetch("/api/user").then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setAllUserState(result);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchUserData = async (id) => {
    try {
      const result = await fetch("/api/user/" + id).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setUserState(result);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const loadData = async () => {
      await fetchData();
      if (isMounted) {
        setLoading(false);
        isMounted = false;
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      setLoading(true);
      let isMounted = true;
      const loadData = async () => {
        await fetchUserData(currentUserId);
        if (isMounted) {
          setLoading(false);
          isMounted = false;
        }
      };
      loadData();
    }
  }, [currentUserId]);

  const handleCreateUser = () => {
    window.location = "/signup";
  };

  const handleLogout = () => {
    auth.logout();
  };

  const goProfilePage = (id) => {
    window.location = "/user/" + id;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={true} timeout={1000}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: "bold", 
            color: "#1a237e",
            textAlign: "center",
            marginBottom: "2rem",
            borderBottom: "3px solid #1a237e",
            paddingBottom: "1rem"
          }}
        >
          User Dashboard
        </Typography>
      </Fade>

      {userState && (
        <UserCard elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: "#1a237e",
                  fontSize: "3rem",
                }}
              >
                {userState.firstName?.[0]}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                Welcome, {userState.firstName} {userState.lastName}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Email: {userState.email}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <ActionButton startIcon={<EditIcon />}>
                  Edit Profile
                </ActionButton>
                <ActionButton 
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                >
                  Logout
                </ActionButton>
              </Box>
            </Grid>
          </Grid>
        </UserCard>
      )}

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          mt: 4, 
          color: "#1a237e",
          textAlign: "center",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "3px",
            backgroundColor: "#1a237e",
          }
        }}
      >
        System Users
      </Typography>

      <Grid container spacing={3}>
        {allUserState.length > 0 &&
          allUserState.map((user, index) => (
            <Grid item xs={12} md={6} key={index}>
              <StyledCard elevation={2}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Tooltip title="View Profile">
                      <Avatar
                        sx={{
                          bgcolor: "#1a237e",
                          cursor: "pointer",
                          width: 56,
                          height: 56,
                        }}
                        onClick={() => goProfilePage(user.id)}
                      >
                        {user.firstName?.[0]}
                      </Avatar>
                    </Tooltip>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Grid>
                </Grid>
              </StyledCard>
            </Grid>
          ))}
      </Grid>

      {loading && <Spinner />}

      <FooterActions>
        <Fade in={true} timeout={1000}>
          <ActionButton
            startIcon={<PersonAddIcon />}
            onClick={handleCreateUser}
            sx={{
              backgroundColor: "#2e7d32",
              "&:hover": {
                backgroundColor: "#1b5e20",
              }
            }}
          >
            Create New User
          </ActionButton>
        </Fade>
        
        <Fade in={true} timeout={1000}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <ActionButton
              startIcon={<HomeIcon />}
              sx={{
                backgroundColor: "#0288d1",
                "&:hover": {
                  backgroundColor: "#01579b",
                }
              }}
            >
              Home Page
            </ActionButton>
          </Link>
        </Fade>
      </FooterActions>
    </Container>
  );
}
