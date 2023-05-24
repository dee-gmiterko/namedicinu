import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { FormattedMessage } from "react-intl";
import { slugifyFaculty, slugifyStudyField, fixNbsp } from "../utils";

export const SideMenu = ({ items }) => {
  return (
    <ul className="side-menu pt-3">
      {items.map((item, index) => {
        return (
          <li key={index}>
            <AnchorLink to={item.link} className={item.active ? "active" : ""}>
              <div>{item.name}</div>
            </AnchorLink>
          </li>
        );
      })}
    </ul>
  );
};

export const CourseSideMenu = ({ visible }) => {
  const lastVisible = visible.reduce((accumulator, currentValue, index) => {
    if (currentValue) {
      return Math.max(accumulator, index);
    } else {
      return accumulator;
    }
  }, -1);

  return (
    <SideMenu
      items={[
        {
          link: "/#Course",
          name: <FormattedMessage id="title.course" defaultMessage="Course" />,
          active: lastVisible === 0,
        },
        {
          link: "/#Lecture",
          name: (
            <FormattedMessage id="title.lecture" defaultMessage="Lecturers" />
          ),
          active: lastVisible === 1,
        },
        {
          link: "/#Testimonials",
          name: (
            <FormattedMessage
              id="title.testimonials"
              defaultMessage="Testimonials"
            />
          ),
          active: lastVisible === 2,
        },
        {
          link: "/#Lecturers",
          name: (
            <FormattedMessage id="title.lecturers" defaultMessage="Lecturers" />
          ),
          active: lastVisible === 3,
        },
        {
          link: "/#Products",
          name: (
            <FormattedMessage id="title.products" defaultMessage="Products" />
          ),
          active: lastVisible === 4,
        },
        // {
        //   link: "/#FAQ",
        //   name: <FormattedMessage id="title.faq" defaultMessage="FAQ" />,
        //   active: lastVisible === 5,
        // },
        {
          link: "/#Contact",
          name: (
            <FormattedMessage id="title.contact" defaultMessage="Contact" />
          ),
          active: lastVisible === 6,
        },
      ]}
    />
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
      name: (
        <FormattedMessage id="title.faculties" defaultMessage="Faculties" />
      ),
      active: lastVisible === 0,
    },
    {
      link: "/faculties#Quiz",
      name: <FormattedMessage id="title.quiz" defaultMessage="Quiz" />,
      active: lastVisible === 1,
    },
  ].concat(
    faculties.map((faculty, index) => {
      return {
        link: "/faculties#" + slugifyFaculty(faculty),
        name: (
          <>
            <span className="on-small">{fixNbsp(faculty.shortTitle)}</span>
            <span className="on-large">{fixNbsp(faculty.title)}</span>
          </>
        ),
        active: lastVisible === 2 + index,
      };
    })
  );

  return <SideMenu items={items} />;
};

export const StudyFieldsSideMenu = ({ studyFields, visible }) => {
  const lastVisible = visible.reduce((accumulator, currentValue, index) => {
    if (currentValue) {
      return Math.max(accumulator, index);
    } else {
      return accumulator;
    }
  }, -1);

  const items = [
    {
      link: "/fields",
      name: <FormattedMessage id="title.fields" defaultMessage="Fields" />,
      active: lastVisible === 0,
    },
  ].concat(
    studyFields.map((studyField, index) => {
      return {
        link: "/fields#" + slugifyStudyField(studyField),
        name: (
          <>
            <span>{fixNbsp(studyField.title)}</span>
          </>
        ),
        active: lastVisible === index + 1,
      };
    })
  );

  return <SideMenu items={items} />;
};

export const StudyFieldSideMenu = ({ studyField, faculties, visible }) => {
  const lastVisible = visible.reduce((accumulator, currentValue, index) => {
    if (currentValue) {
      return Math.max(accumulator, index);
    } else {
      return accumulator;
    }
  }, -1);

  const items = [
    {
      link: `/field/${slugifyStudyField(studyField)}#Field`,
      name: (
        <FormattedMessage id="title.faculties" defaultMessage="Faculties" />
      ),
      active: lastVisible === 0,
    },
  ].concat(
    faculties.map((faculty, index) => {
      return {
        link: `/field/${slugifyStudyField(studyField)}#${slugifyFaculty(
          faculty
        )}`,
        name: (
          <>
            <span>{fixNbsp(faculty.title)}</span>
          </>
        ),
        active: lastVisible === index + 1,
      };
    })
  );

  return <SideMenu items={items} />;
};
