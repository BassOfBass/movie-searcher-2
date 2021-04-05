import { useState } from "react";
import { statusList } from "scripts";
import { iso6391Languages } from "scripts/iso-639-1";
import { tmdbAPI } from "scripts/tmdb/api";
import { retrieveAccessToken } from "scripts/tmdb/session";

/**
 * TODO: make a preview section
 */
export function CreateList() {
  const [status, changeStatus] = useState(statusList.idle);
  const [listID, setListID] = useState(null);
  const [error, setError] = useState(null);
  /**
   * @param {import("react").FormEvent<HTMLFormElement} event 
   */
  async function handleListCreation(event) {
    event.preventDefault();

    /** 
     * @type {HTMLFormElement}
     */
    const form = event.target;
    /**
     * @type {HTMLButtonElement}
     */
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;

    const nameInput = form.elements["name"];
    const langInput = form.elements["iso_639_1"];
    /**
     * @type {HTMLTextAreaElement}
     */
    const descInput = form.elements["description"];
    /**
     * @type {HTMLInputElement}
     */
    const publicInput = form.elements["public"];

    const reqBody = {
      name: nameInput.value,
      iso_639_1: langInput.value,
      description: descInput.value,
      public: publicInput.checked ? true : false,
      access_token: retrieveAccessToken()
    }

    const response = await tmdbAPI.list.createList(reqBody);
    changeStatus(statusList.loading);

    // validation error
    if (response.success !== true) {
      setError(response.message);
      changeStatus(statusList.failed);
      button.disabled = false;
    }

    setListID(response.id);
    button.disabled = false;
  }

  return (
    <>
      <h1>Create a new list</h1>
      <section>
        <form onSubmit={handleListCreation}>
          <div>
            <label htmlFor="list-name">Name:</label>
            <input 
              id="list-name" 
              type="text" 
              name="name" 
              required 
            />
          </div>
          <div>
            <label htmlFor="list-lang-639">Language:</label>
            <select 
              id="list-lang-639" 
              name="iso_639_1"  
              defaultValue="en"
            >
              {
                iso6391Languages.map(({ code, name, nativeName }) => (
                  <option 
                    key={code} 
                    value={code}
                  >
                    {nativeName} ({name})
                  </option>
                ))
              }
            </select>
          </div>
          <div>
            <label htmlFor="list-description">Description:</label>
            <textarea 
              id="list-description" 
              name="description" 
              cols="30" 
              rows="10"
            ></textarea>
          </div>
          <div>
            <input 
              id ="list-public" 
              type="checkbox" 
              name="public"
              defaultChecked
            />
            <label htmlFor="list-public">Is it public?</label>
          </div>
          {/* <div>
            <label htmlFor="list-lang-3166">iso_3166_1</label>
            <input id="list-lang-3166" type="text"/>
          </div> */}
          <div>
            <button type="submit">Submit</button>
          </div>
          {
            status !== statusList.succeeded
              ? status === statusList.failed &&
                <output>{error}</output>
                
              : <output>
                  List with ID of {listID} was succesfully created!
                </output>
          }
        </form>
      </section>
    </>
  );
}