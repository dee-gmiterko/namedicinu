import React from "react";
import { FormattedMessage } from 'react-intl';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { slugifyFaculty, fixNbsp } from '../common';

export const SideMenu = ({ items }) => {
  return (
    <ul className="side-menu pt-5">
      {items.map((item, index) => {
        return (
          <li key={index}>
            <AnchorLink to={item.link} className={item.active ? "active" : ""} >
              <div>{item.name}</div>
            </AnchorLink>
          </li>
        );
      })}
    </ul>
  )
}

export const CourseSideMenu = ({ visible }) => {

  const lastVisible = visible.reduce((accumulator, currentValue, index) => {
    if (currentValue) {
      return Math.max(accumulator, index);
    } else {
      return accumulator;
    }
  }, -1);

  return (
    <SideMenu items={[
      {
        link: "/#Course",
        name: <FormattedMessage id="title.course" defaultMessage="Course" />,
        active: lastVisible === 0,
      },
      {
        link: "/#Lecture",
        name: <FormattedMessage id="title.lecture" defaultMessage="Lecturers" />,
        active: lastVisible === 1,
      },
      {
        link: "/#Testimonials",
        name: <FormattedMessage id="title.testimonials" defaultMessage="Testimonials" />,
        active: lastVisible === 2,
      },
      {
        link: "/#Lecturers",
        name: <FormattedMessage id="title.lecturers" defaultMessage="Lecturers" />,
        active: lastVisible === 3,
      },
      {
        link: "/#Products",
        name: <FormattedMessage id="title.register" defaultMessage="Register" />,
        active: lastVisible === 4,
      },
      {
        link: "/#FAQ",
        name: <FormattedMessage id="title.faq" defaultMessage="FAQ" />,
        active: lastVisible === 5,
      },
      {
        link: "/#Contact",
        name: <FormattedMessage id="title.contact" defaultMessage="Contact" />,
        active: lastVisible === 6,
      },
    ]} />
  );
};

export const FacultiesSideMenu = ({ faculties, visible }) => {

  const lastVisible = visible.reduce((accumulator, currentValue, index) => {
    if (currentValue) {
      return Math.max(accumulator, index);
    } else {
      return accumulator;
    }
  }, -1);

  const items = [
    {
      link: "/faculties#Faculties",
      name: <FormattedMessage id="title.faculties" defaultMessage="Faculties" />,
      active: lastVisible === 0,
    },
    {
      link: "/faculties#Quiz",
      name: <FormattedMessage id="title.quiz" defaultMessage="Quiz" />,
      active: lastVisible === 1,
    }
  ].concat(
    faculties.edges.map((item, index) => {
     return {
       link: "/faculties#"+slugifyFaculty(item.node),
       name: (
         <>
           <span className="on-small">{fixNbsp(item.node.shortTitle)}</span>
           <span className="on-large">{fixNbsp(item.node.title)}</span>
         </>
       ),
       active: lastVisible === 2 + index,
     }
    })
  ).concat(
    [
      {
        link: "/faculties#Contact",
        name: <FormattedMessage id="title.contact" defaultMessage="Contact" />,
        active: lastVisible === faculties.edges.length + 2,
      }
    ]
  );

  return (
    <SideMenu items={items} />
  );
};
