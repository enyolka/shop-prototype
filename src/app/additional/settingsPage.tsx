import * as React from "react";
import Radio from "../../components/radio/radio";
import "./settingsPage.css"
import settings from "/public/images/settings.png"

type Props = {
  headerOptions: string[];
  headerOption: string;
  setHeaderOption: (value: string) => void;
  colorOptions: string[];
  colorOption: string;
  setColorOption: (value: string) => void;
}

const SettingsPage =({ headerOptions, headerOption, setHeaderOption, colorOptions, colorOption, setColorOption }: Props) => {
    return (
      <>
        <article className="settings">
              <img alt="settings" src={settings} className="settings_img"/>
          <div className=" setting_forms">
            <ul className="settings_form card">
              <h3>Nagłówek</h3>
              {headerOptions.map(option => 
                  <li 
                    onClick={() => setHeaderOption(option)}
                    className="settings_form__item"
                  >
                    <Radio id={option} label={option} groupName="header" checked={option === headerOption} />
                  </li>
              )}
              </ul>

              <ul className="settings_form card">
                <h3>Kolory</h3>
                {colorOptions.map(option => 
                    <li 
                      onClick={() => setColorOption(option)}
                      className="settings_form__item"
                    >
                      <Radio id={option} label={option} groupName="color" checked={option === colorOption}/>
                    </li>
                )}
              </ul>
            </div>
      </article>
     </>
    );
  };

export default SettingsPage;