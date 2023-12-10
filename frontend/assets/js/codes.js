export const genreClass = [
  `
    <div style="color: var(--color-class);">class&nbsp;</div>
    <div style="color: var(--color-class-name);">Genre&nbsp;</div>
    <div style="color: var(--color-parentheses);">&#123;&nbsp;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-class);">private&nbsp;</div>
    <div style="color: var(--color-define);">genre</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-name);">string</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-class);">constructor</div>
    <div style="color: var(--color-import);">&#40;</div>
    <div style="color: var(--color-define);">genre</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-name);">string</div>
    <div style="color: var(--color-import);">&#41;&nbsp;</div>
    <div style="color: var(--color-import);">&#123;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div style="color: var(--color-class);">this</div>
    <div style="color: var(--color-equal);">&#46;</div>
    <div style="color: var(--color-define);">genre&nbsp;</div>
    <div style="color: var(--color-equal);">&#61;&nbsp;</div>
    <div style="color: var(--color-define);">genre</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-import);">&#125;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-class-method);">goToPage</div>
    <div style="color: var(--color-import);">&#40;</div>
    <div style="color: var(--color-define);">genre</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-name);">string</div>
    <div style="color: var(--color-import);">&#41;&nbsp;</div>
    <div style="color: var(--color-import);">&#123;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div style="color: var(--color-import);">return&nbsp;</div>
    <div style="color: var(--color-define);">window</div>
    <div style="color: var(--color-equal);">&#46;</div>
    <div style="color: var(--color-define);">location</div>
    <div style="color: var(--color-equal);">&#46;</div>
    <div style="color: var(--color-define);">href&nbsp;</div>
    <div style="color: var(--color-equal);">&#61;&nbsp;</div>
    <div style="color: var(--color-string);">&#096;</div>
    <div style="color: var(--color-string);">&#047;</div>
    <div style="color: var(--color-class);">&#036;</div>
    <div style="color: var(--color-class);">&#123;&nbsp;</div>
    <div style="color: var(--color-class);">this</div>
    <div style="color: var(--color-equal);">&#46;</div>
    <div style="color: var(--color-define);">genre</div>
    <div style="color: var(--color-class);">&#125;</div>
    <div style="color: var(--color-string);">&#096;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-import);">&#125;</div>
  `,
  `
    <div style="color: var(--color-parentheses);">&#125;</div>
  `,
];

export const selectGenreFunc = [
  `
    <div style="color: var(--color-class);">interface&nbsp;</div>
    <div style="color: var(--color-class-name);">Genre&nbsp;</div>
    <div style="color: var(--color-parentheses);">&#123;&nbsp;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-primary);">id</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-name);">number</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-primary);">title</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-name);">string</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-primary);">to</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-name);">string</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-primary);">icon</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-name);">string</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="color: var(--color-parentheses);">&#125;</div>
  `,
];

export const genreSelectorHTML = [
  `
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-class-name);">NuxtLink&nbsp;</div>
    <div style="color: var(--color-equal);">&#58;</div>
    <div style="color: var(--color-primary);">to</div>
    <div style="color: var(--color-equal);">&#61;</div>
    <div style="color: var(--color-string);">&#34;</div>
    <div style="color: var(--color-primary);">to</div>
    <div style="color: var(--color-string);">&#34;&nbsp;</div>
    <div style="color: var(--color-equal);">&#58;</div>
    <div style="color: var(--color-primary);">key</div>
    <div style="color: var(--color-equal);">&#61;</div>
    <div style="color: var(--color-string);">&#34;</div>
    <div style="color: var(--color-primary);">id</div>
    <div style="color: var(--color-string);">&#34;</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
  `
    <div style="color: var(--color-tag);">&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-class);">div&nbsp;</div>
    <div style="color: var(--color-primary);">class</div>
    <div style="color: var(--color-equal);">&#61;</div>
    <div style="color: var(--color-string);">&#34;genre-content&#34;</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
  `
    <div style="color: var(--color-tag);">&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-class-name);">SvgIcon&nbsp;</div>
    <div style="color: var(--color-equal);">&#58;</div>
    <div style="color: var(--color-primary);">path</div>
    <div style="color: var(--color-equal);">&#61;</div>
    <div style="color: var(--color-string);">&#34;</div>
    <div style="color: var(--color-primary);">icon</div>
    <div style="color: var(--color-string);">&#34;&nbsp;</div>
    <div style="color: var(--color-tag);">&#47;</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
  `
    <div style="color: var(--color-tag);">&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-class);">div</div>
    <div style="color: var(--color-tag);">&#62;</div>
    <div style="color: var(--color-parentheses);">{{&nbsp;</div>
    <div style="color: var(--color-primary);">title&nbsp;</div>
    <div style="color: var(--color-parentheses);">}} </div>
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-tag);">&#47;</div>
    <div style="color: var(--color-class);">div</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
  `
    <div style="color: var(--color-tag);">&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-tag);">&#47;</div>
    <div style="color: var(--color-class);">div</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
  `
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-tag);">&#47;</div>
    <div style="color: var(--color-class-name);">NuxtLink</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
];
