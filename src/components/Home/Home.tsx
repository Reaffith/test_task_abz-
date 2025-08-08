
import "./Home.scss";


export const Home = () => {
  return (
    <section className="home">

      <div className="home_content">
        <h1 className="home_content-header">
          Test assignment for front-end developer
        </h1>

        <p className="home_content-text">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>

        <a
          href="#post"
          className="home_content-button"
        >
          Sign up
        </a>
      </div>
    </section>
  );
};
