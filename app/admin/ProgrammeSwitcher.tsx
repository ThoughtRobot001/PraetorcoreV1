'use client';

import { rememberProgrammePreferenceAction } from './actions';

interface ProgrammeOption {
  id: string;
  slug: string;
  title: string;
  status: string;
}

export function ProgrammeSwitcher({ programmes, selected }: { programmes: ProgrammeOption[]; selected: string }) {
  return (
    <form action={rememberProgrammePreferenceAction}>
      <label className="admin-field">
        <span>Programme</span>
        <select
          name="programme"
          defaultValue={selected}
          onChange={(event) => event.currentTarget.form?.requestSubmit()}
        >
          {programmes.map((programme) => (
            <option key={programme.id} value={programme.slug}>
              {programme.title} ({programme.status})
            </option>
          ))}
        </select>
      </label>
      <noscript><button className="admin-button" type="submit">Apply</button></noscript>
    </form>
  );
}
