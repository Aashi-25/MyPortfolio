import StaggeredMenu from "./StaggeredMenu";
import { navLinks } from "../constants";

const NavBar = () => {
  // Map navLinks to StaggeredMenu items format
  const menuItems = [
    ...navLinks.map(({ link, name }) => ({
      label: name,
      link: link,
      ariaLabel: `Navigate to ${name} section`
    })),
    {
      label: "Contact",
      link: "#contact",
      ariaLabel: "Navigate to Contact section"
    }
  ];

  // Social items (you can customize these with actual links)
  const socialItems = [
    { label: "LinkedIn", link: "#" },
    { label: "GitHub", link: "#" },
    { label: "Twitter", link: "#" },
    { label: "Instagram", link: "#" }
  ];

  return (
    <StaggeredMenu
      position="right"
      colors={['#1e1e22', '#35353c', '#5227FF']}
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      isFixed={true}
      accentColor="#5227FF"
      menuButtonColor="#e9e9ef"
      openMenuButtonColor="#5227FF"
      changeMenuColorOnOpen={true}
      closeOnClickAway={true}
    />
  );
}

export default NavBar;
