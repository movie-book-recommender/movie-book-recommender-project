import { useState } from "react";
import { Link } from "react-router-dom";
import { clearAll } from "../Cookies";
import { Modal, Box, Button } from "@mui/material";

const CookiePreferences = () => {
    const [open, setOpen] = useState(false)
    function closeModal(){
        setOpen(false)
    }
    function resetCookiePreferences(){
        localStorage.clear()
        clearAll()
        closeModal()
        window.location.reload(false)
    }
    const Popup = () => {
        return (
            <Modal open={open} onClose={closeModal}>
                <Box
                sx={{
                    color: "black",
                    bgcolor: "white",
                    width: 800,
                    heigh: 800,
                    border: 2,
                    mx: "auto",
                    mt: 10,
                    textAlign: "center",
                }}
                >
                    <h3>Do you want to reset your cookie preferences.</h3>
                    <p>Resetting your cookie preferences will also reset your ratings and wishlist.</p>    
                    <Button onClick={()=>{
                        resetCookiePreferences()
                    }}>
                        Change my preferences
                    </Button>
                    <Button onClick={()=>{
                        closeModal()
                    }}>
                        Never mind
                    </Button>
                </Box>
            </Modal>
        )
    }
    return(
        <div>
        <Popup />
        <Button onClick={() =>{
            setOpen(true)
        }}>
            Change preferences
        </Button>
        </div>
    )
}

const About = () => {
    return(
        <div class="about-page-wrapper">
            <h1>About BookCine</h1>
            <p>
                This website uses data from the following three sources: <Link to="https://movielens.org/" target="_blank" rel="noopener noreferrer">MovieLens</Link>
                , <Link to="https://grouplens.org/datasets/movielens/tag-genome-2021/" target="_blank" rel="noopener noreferrer">Tag Genome for movies</Link> 
                and <Link to="https://grouplens.org/datasets/book-genome/" target="_blank" rel="noopener noreferrer">Tag Genome for books</Link>. 
                The datasets include data collected from <Link to="https://www.imdb.com/" target="_blank" rel="noopener noreferrer">IMDb</Link> and &nbsp
                <Link to="https://www.goodreads.com/" target="_blank" rel="noopener noreferrer">Goodreads</Link> and are related to the following publications:
                <div class="publication">
                    Kotkov, D., Medlar, A., Maslov, A., Satyal, U. R., Neovius, M., & Glowacka, D. (2022, March). The Tag Genome Dataset for Books. In ACM SIGIR Conference on Human Information Interaction and Retrieval (pp. 353-357).
                </div>
                <div class="publication">
                    Kotkov, D., Maslov, A., and Neovius, M. (2021). Revisiting the tag relevance prediction problem. In Proceedings of the 44th International ACM SIGIR conference on Research and Development in Information Retrieval. <Link to="https://doi.org/10.1145/3404835.3463019" target="_blank" rel="noopener noreferrer">https://doi.org/10.1145/3404835.3463019</Link> <br />
                </div>
                <div class="publication">
                    Vig, J., Sen, S., and Riedl, J. (2012). The tag genome: Encoding community knowledge to support novel interaction. ACM Trans. Interact. Intell. Syst., 2(3):13:1–13:44. <Link to="https://doi.org/10.1145/2362394.2362395" target="_blank" rel="noopener noreferrer">https://doi.org/10.1145/2362394.2362395</Link> <br />
                </div>
            </p>
            <p>
                The source code of project can be found in <Link to="https://github.com/movie-book-recommender/movie-book-recommender-project" target="_blank" rel="noopener noreferrer">Github</Link>.
            </p>
            <p></p>
            <h2>Cookie preferences</h2>
            <CookiePreferences />
        </div>
    )
}

export { About }
