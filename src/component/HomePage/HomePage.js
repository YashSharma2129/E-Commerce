import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { AddShoppingCart, Add } from "@mui/icons-material";
import CartContext from "../store/cart-context";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";


const StyledCard = styled(Card)`
  height: 100%;
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
  
  transition: all 0.3s ease-in-out;
`;

const HeroSection = styled('div')`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 20px;
  border-radius: 20px;
  margin-bottom: 40px;
  color: white;
  text-align: center;
`;

export default function Homepage(props) {
  const { isLoggedIn, search } = props;
  const [loading, setLoading] = useState(false);
  const [initialState, setInitialState] = useState([]);
  const [filteredState, setFilteredState] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const cart = useContext(CartContext);

  const fetchData = async () => {
    try {
      const result = await fetch("/api").then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Unable to fetch data.");
        }
      });
      setInitialState(result);
    } catch (e) {
      console.error(e.message);
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
    if (search.trim().length > 0 && initialState) {
      const result = initialState.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredState(result);
    }
  }, [search, initialState]);

  const handleClick = (id) => {
    if (isLoggedIn) {
      window.location = `/product/${id}`;
    } else {
      alert("Please log in to view or edit products.");
    }
  };

  const addToCart = (item) => {
    cart.setCartItems(item);
    setSnackbarMessage("Item added to cart!");
    setSnackbarOpen(true);
  };

  const handleAddClick = () => {
    window.location = "/product";
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Poppins', sans-serif", background: '#f8f9fa' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection>
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Typography variant="h2" sx={{ 
              fontWeight: 800, 
              fontSize: { xs: '2rem', md: '3.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}>
              Discover Amazing Products
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, mb: 3, opacity: 0.9 }}>
              Shop the latest trends with confidence
            </Typography>
          </motion.div>
        </HeroSection>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", height: "300px", alignItems: "center" }}>
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { repeat: Infinity, duration: 1.5 },
                scale: { repeat: Infinity, duration: 1 }
              }}
            >
              <CircularProgress size={80} thickness={4} color="secondary" />
            </motion.div>
          </div>
        ) : (
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {(search.trim().length > 0 ? filteredState : initialState).map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StyledCard>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" gutterBottom sx={{ 
                        fontWeight: 600,
                        color: '#2c3e50'
                      }}>
                        {product.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: '#666',
                        minHeight: '60px'
                      }}>
                        {product.description}
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        mt: 2,
                        color: product.quantity ? '#28a745' : '#dc3545',
                        fontWeight: 600
                      }}>
                        ${product.price}
                      </Typography>
                      <Typography variant="subtitle2" sx={{
                        mt: 1,
                        color: product.quantity ? 'success.main' : 'error.main'
                      }}>
                        {product.quantity ? `${product.quantity} in stock` : 'Out of Stock'}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                      {product.quantity ? (
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddShoppingCart />}
                            onClick={() => addToCart(product)}
                            sx={{
                              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                            }}
                          >
                            Add to Cart
                          </Button>
                        </motion.div>
                      ) : (
                        <Typography variant="body2" color="error" fontWeight="bold">
                          Out of Stock
                        </Typography>
                      )}
                      <Button
                        variant="outlined"
                        onClick={() => handleClick(product.id)}
                        sx={{
                          borderColor: '#764ba2',
                          color: '#764ba2',
                          '&:hover': {
                            borderColor: '#667eea',
                            backgroundColor: 'rgba(118, 75, 162, 0.1)'
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          {isLoggedIn ? (
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Add />}
                onClick={handleAddClick}
              >
                Add a New Product
              </Button>
            </motion.div>
          ) : (
            <Typography variant="h6" color="textSecondary">
              Please log in to add, edit, or delete products.
            </Typography>
          )}
        </div>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </motion.div>
    </div>
  );
}
