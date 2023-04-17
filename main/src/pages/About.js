const About = () => {
    return(
        <div class="about-page-wrapper">
            <h1>About BookCine</h1>
            <p>
                This website uses data from the following three sources: <a href="https://movielens.org/">MovieLens</a>, <a href="https://grouplens.org/datasets/movielens/tag-genome-2021/">Tag Genome for movies</a>  and <a href="https://grouplens.org/datasets/book-genome/">Tag Genome for books</a>. 
                The datasets include data collected from <a href="https://www.imdb.com/">IMDb</a>  and <a href="https://www.goodreads.com/">Goodreads</a> and are related to the following publications:
                <div class="publication">
                    Kotkov, D., Medlar, A., Maslov, A., Satyal, U. R., Neovius, M., & Glowacka, D. (2022, March). The Tag Genome Dataset for Books. In ACM SIGIR Conference on Human Information Interaction and Retrieval (pp. 353-357).
                </div>
                <div class="publication">
                    Kotkov, D., Maslov, A., and Neovius, M. (2021). Revisiting the tag relevance prediction problem. In Proceedings of the 44th International ACM SIGIR conference on Research and Development in Information Retrieval. https://doi.org/10.1145/3404835.3463019 <br />
                </div>
                <div class="publication">
                    Vig, J., Sen, S., and Riedl, J. (2012). The tag genome: Encoding community knowledge to support novel interaction. ACM Trans. Interact. Intell. Syst., 2(3):13:1–13:44. https://doi.org/10.1145/2362394.2362395 <br />
                </div>
            </p>
        </div>
    )
}

export { About }
