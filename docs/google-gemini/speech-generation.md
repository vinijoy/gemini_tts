---
source_url: "https://ai.google.dev/gemini-api/docs/generate-content/speech-generation"
version: "2026-10-11 Gemini 3.8 TTS"
captured_at: "2026-10-11T07:17:57.966865+00:00"
---

~~~~html









<!doctype html>
<html 
      lang="en"
      dir="ltr">
  <head>
    <meta name="google-signin-client-id" content="157101835696-ooapojlodmuabs2do2vuhhnf90bccmoi.apps.googleusercontent.com"><meta name="google-signin-scope"
          content="profile email https://www.googleapis.com/auth/developerprofiles https://www.googleapis.com/auth/developerprofiles.award https://www.googleapis.com/auth/devprofiles.full_control.firstparty"><meta property="og:site_name" content="Google AI for Developers">
    <meta property="og:type" content="website"><meta name="theme-color" content="#1967d2"><meta charset="utf-8">
    <meta content="IE=Edge" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    

    <link rel="manifest" href="/_pwa/googledevai/manifest.json"
          crossorigin="use-credentials">
    <link rel="preconnect" href="//www.gstatic.com" crossorigin>
    <link rel="preconnect" href="//fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="//www.google-analytics.com" crossorigin><link rel="stylesheet" href="//fonts.googleapis.com/css?family=Google+Sans:400,500|Roboto:400,400italic,500,500italic,700,700italic|Roboto+Mono:400,500,700|Inter:400,500|Inter+Tight:300,500,600&display=swap">
      <link rel="stylesheet"
            href="//fonts.googleapis.com/css2?family=Material+Icons&family=Material+Symbols+Outlined&display=block"><link rel="stylesheet" href="https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/googledevai/css/app.css">
      
        <link rel="stylesheet" href="https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/googledevai/css/dark-theme.css" disabled>
      <link rel="shortcut icon" href="https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/googledevai/images/favicon-new.png">
    <link rel="apple-touch-icon" href="https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/googledevai/images/touchicon-180-new.png"><link rel="canonical" href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation"><link rel="search" type="application/opensearchdescription+xml"
            title="Google AI for Developers" href="https://ai.google.dev/s/opensearch.xml">
      <link rel="alternate" hreflang="en"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation" /><link rel="alternate" hreflang="x-default" href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation" /><link rel="alternate" hreflang="ar"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=ar" /><link rel="alternate" hreflang="bn"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=bn" /><link rel="alternate" hreflang="zh-Hans"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=zh-cn" /><link rel="alternate" hreflang="zh-Hant"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=zh-tw" /><link rel="alternate" hreflang="fa"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=fa" /><link rel="alternate" hreflang="fr"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=fr" /><link rel="alternate" hreflang="de"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=de" /><link rel="alternate" hreflang="he"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=he" /><link rel="alternate" hreflang="hi"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=hi" /><link rel="alternate" hreflang="id"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=id" /><link rel="alternate" hreflang="it"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=it" /><link rel="alternate" hreflang="ja"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=ja" /><link rel="alternate" hreflang="ko"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=ko" /><link rel="alternate" hreflang="pl"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=pl" /><link rel="alternate" hreflang="pt-BR"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=pt-br" /><link rel="alternate" hreflang="ru"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=ru" /><link rel="alternate" hreflang="es-419"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=es-419" /><link rel="alternate" hreflang="th"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=th" /><link rel="alternate" hreflang="tr"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=tr" /><link rel="alternate" hreflang="vi"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=vi" /><link rel="alternate" hreflang="sq"
          href="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation?hl=sq" /><title>Text-to-speech generation (TTS) &nbsp;|&nbsp; Gemini Generate Content API (Legacy) &nbsp;|&nbsp; Google AI for Developers</title>

<meta property="og:title" content="Text-to-speech generation (TTS) &nbsp;|&nbsp; Gemini Generate Content API (Legacy) &nbsp;|&nbsp; Google AI for Developers"><meta name="description" content="Generate high-fidelity speech and multi-speaker audio with the Gemini API using gemini-3.8-flash-tts and gemini-3.8-flash-lite-tts.">
  <meta property="og:description" content="Generate high-fidelity speech and multi-speaker audio with the Gemini API using gemini-3.8-flash-tts and gemini-3.8-flash-lite-tts."><meta property="og:url" content="https://ai.google.dev/gemini-api/docs/generate-content/speech-generation"><meta property="og:image" content="https://ai.google.dev/static/site-assets/images/share-gemini-api-2026-07.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675"><meta property="og:locale" content="en"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    
    "headline": "Text-to-speech generation (TTS)"
  }
</script><script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Generate Content API",
      "item": "https://ai.google.dev/gemini-api/docs/generate-content/get-started"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Text-to-speech generation (TTS)",
      "item": "https://ai.google.dev/gemini-api/docs/generate-content/speech-generation"
    }]
  }
  </script>
  

  

  

  


    </head>
  <body class="gemini-api color-scheme--light"
        template="page"
        theme="googledevai-theme"
        type="article"
        
        appearance
        
        layout="docs"
        
        
        
        
        
        display-toc
        pending>
  
    <devsite-progress type="indeterminate" id="app-progress"></devsite-progress>
  
  
    <a href="#main-content" class="skip-link button">
      
      Skip to main content
    </a>
    <section class="devsite-wrapper">
      <devsite-cookie-notification-bar></devsite-cookie-notification-bar>
        <devsite-header role="banner" keep-tabs-visible>
  
    





















<div class="devsite-header--inner" data-nosnippet>
  <div class="devsite-top-logo-row-wrapper-wrapper">
    <div class="devsite-top-logo-row-wrapper">
      <div class="devsite-top-logo-row">
        <button type="button" id="devsite-hamburger-menu"
          class="devsite-header-icon-button button-flat material-icons gc-analytics-event"
          data-category="Site-Wide Custom Events"
          data-label="Navigation menu button"
          visually-hidden
          aria-label="Open menu">
        </button>
        
<div class="devsite-product-name-wrapper">

  <a href="/" class="devsite-site-logo-link gc-analytics-event"
   data-category="Site-Wide Custom Events" data-label="Site logo" track-type="globalNav"
   track-name="geminiGenerateContentAPI(Legacy)" track-metadata-position="nav"
   track-metadata-eventDetail="nav">
  
  <picture>
    
    <source srcset="https://ai.google.dev/_static/googledevai/images/gemini-api-logo-dark-theme.svg"
            media="(prefers-color-scheme: dark)"
            class="devsite-dark-theme">
    
    <img src="https://ai.google.dev/_static/googledevai/images/gemini-api-logo.svg" class="devsite-site-logo" alt="Gemini Generate Content API (Legacy)">
  </picture>
  
</a>



  
  
  <span class="devsite-product-name">
    <ul class="devsite-breadcrumb-list"
  >
  
  <li class="devsite-breadcrumb-item
             ">
    
    
    
      
      
    
  </li>
  
</ul>
  </span>

</div>
        <div class="devsite-top-logo-row-middle">
          <div class="devsite-header-upper-tabs">
            
           </div>
          
<devsite-search
    enable-signin
    enable-search
    enable-suggestions
      enable-query-completion
    
    enable-search-summaries
    project-name="Gemini Generate Content API (Legacy)"
    tenant-name="Google AI for Developers"
    project-scope="/gemini-api/docs/generate-content/get-started"
    url-scoped="https://ai.google.dev/s/results/gemini-api/docs/generate-content/get-started"
    
    
    
    >
  <form class="devsite-search-form" action="https://ai.google.dev/s/results" method="GET">
    <div class="devsite-search-container">
      <button type="button"
              search-open
              class="devsite-search-button devsite-header-icon-button button-flat material-icons"
              
              aria-label="Open search"></button>
      <div class="devsite-searchbox">
        <input
          aria-activedescendant=""
          aria-autocomplete="list"
          
          aria-label="Search"
          aria-expanded="false"
          aria-haspopup="listbox"
          autocomplete="off"
          class="devsite-search-field devsite-search-query"
          name="q"
          
          placeholder="Search"
          role="combobox"
          type="text"
          value=""
          >
          <div class="devsite-search-image material-icons" aria-hidden="true">
            
              <svg class="devsite-search-ai-image" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_6641_386)">
                    <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14167 15.375 4.875 14.125C3.625 12.8583 3 11.3167 3 9.5C3 7.68333 3.625 6.15 4.875 4.9C6.14167 3.63333 7.68333 3 9.5 3C10.0167 3 10.5167 3.05833 11 3.175C11.4833 3.275 11.9417 3.43333 12.375 3.65L10.825 5.2C10.6083 5.13333 10.3917 5.08333 10.175 5.05C9.95833 5.01667 9.73333 5 9.5 5C8.25 5 7.18333 5.44167 6.3 6.325C5.43333 7.19167 5 8.25 5 9.5C5 10.75 5.43333 11.8167 6.3 12.7C7.18333 13.5667 8.25 14 9.5 14C10.6667 14 11.6667 13.625 12.5 12.875C13.35 12.1083 13.8417 11.15 13.975 10H15.975C15.925 10.6333 15.7833 11.2333 15.55 11.8C15.3333 12.3667 15.05 12.8667 14.7 13.3L21 19.6L19.6 21ZM17.5 12C17.5 10.4667 16.9667 9.16667 15.9 8.1C14.8333 7.03333 13.5333 6.5 12 6.5C13.5333 6.5 14.8333 5.96667 15.9 4.9C16.9667 3.83333 17.5 2.53333 17.5 0.999999C17.5 2.53333 18.0333 3.83333 19.1 4.9C20.1667 5.96667 21.4667 6.5 23 6.5C21.4667 6.5 20.1667 7.03333 19.1 8.1C18.0333 9.16667 17.5 10.4667 17.5 12Z" fill="#5F6368"/>
                  </g>
                <defs>
                <clipPath id="clip0_6641_386">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            
          </div>
          <div class="devsite-search-shortcut-icon-container" aria-hidden="true">
            <kbd class="devsite-search-shortcut-icon">/</kbd>
          </div>
      </div>
    </div>
  </form>
  <button type="button"
          search-close
          class="devsite-search-button devsite-header-icon-button button-flat material-icons"
          
          aria-label="Close search"></button>
</devsite-search>

        </div>

        

          

          

          

          <devsite-appearance-selector></devsite-appearance-selector>

          
<devsite-language-selector>
  <ul role="presentation">
    
    
    <li role="presentation">
      <a role="menuitem" lang="en"
        >English</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="de"
        >Deutsch</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="es_419"
        >Español – América Latina</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="fr"
        >Français</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="id"
        >Indonesia</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="it"
        >Italiano</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="pl"
        >Polski</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="pt_br"
        >Português – Brasil</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="sq"
        >Shqip</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="vi"
        >Tiếng Việt</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="tr"
        >Türkçe</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="ru"
        >Русский</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="he"
        >עברית</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="ar"
        >العربيّة</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="fa"
        >فارسی</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="hi"
        >हिंदी</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="bn"
        >বাংলা</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="th"
        >ภาษาไทย</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="zh_cn"
        >中文 – 简体</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="zh_tw"
        >中文 – 繁體</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="ja"
        >日本語</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="ko"
        >한국어</a>
    </li>
    
  </ul>
</devsite-language-selector>


          
            <a class="devsite-header-link devsite-top-button button gc-analytics-event "
    href="https://aistudio.google.com/apikey"
    data-category="Site-Wide Custom Events"
    data-label="Site header link: Get API key"
    
      
        target="_blank"
      
    >
  Get API key
</a>
          
            <a class="devsite-header-link devsite-top-button button gc-analytics-event "
    href="https://github.com/google-gemini/cookbook"
    data-category="Site-Wide Custom Events"
    data-label="Site header link: Cookbook"
    
      
        target="_blank"
      
    >
  Cookbook
</a>
          
            <a class="devsite-header-link devsite-top-button button gc-analytics-event "
    href="https://discuss.ai.google.dev/c/gemini-api/"
    data-category="Site-Wide Custom Events"
    data-label="Site header link: Community"
    
      
        target="_blank"
      
    >
  Community
</a>
          

        

        
          <devsite-user 
                        
                        
                          enable-profiles
                        
                        
                        id="devsite-user">
            
              
              <span class="button devsite-top-button" aria-hidden="true" visually-hidden>Sign in</span>
            
          </devsite-user>
        
        
        
      </div>
    </div>
  </div>



  <div class="devsite-collapsible-section
    ">
    <div class="devsite-header-background">
      
        
      
      
        <div class="devsite-doc-set-nav-row">
          
          
            
            
  <devsite-tabs class="lower-tabs">

    <nav class="devsite-tabs-wrapper" aria-label="Lower tabs">
      
        
          <tab  class="devsite-active">
            
    <a href="https://ai.google.dev/gemini-api/docs/generate-content"
    class="devsite-tabs-content gc-analytics-event "
      track-metadata-eventdetail="https://ai.google.dev/gemini-api/docs/generate-content"
    
       track-type="nav"
       track-metadata-position="nav - docs"
       track-metadata-module="primary nav"
       aria-label="Docs, selected" 
       
         
           data-category="Site-Wide Custom Events"
         
           data-label="Tab: Docs"
         
           track-name="docs"
         
       >
    Docs
  
    </a>
    
  
          </tab>
        
      
        
          <tab  >
            
    <a href="https://ai.google.dev/api"
    class="devsite-tabs-content gc-analytics-event "
      track-metadata-eventdetail="https://ai.google.dev/api"
    
       track-type="nav"
       track-metadata-position="nav - api reference"
       track-metadata-module="primary nav"
       
       
         
           data-category="Site-Wide Custom Events"
         
           data-label="Tab: API reference"
         
           track-name="api reference"
         
       >
    API reference
  
    </a>
    
  
          </tab>
        
      
    </nav>

  </devsite-tabs>

          
          
        </div>
      
    </div>
  </div>

</div>



  

  
</devsite-header>
        <devsite-book-nav scrollbars >
          
            





















<div class="devsite-book-nav-filter"
     hidden>
  <span class="filter-list-icon material-icons" aria-hidden="true"></span>
  <input type="text"
         placeholder="Filter"
         
         aria-label="Type to filter"
         role="searchbox">
  
  <span class="filter-clear-button hidden"
        data-title="Clear filter"
        aria-label="Clear filter"
        role="button"
        tabindex="0"></span>
</div>

<nav class="devsite-book-nav devsite-nav nocontent" data-nosnippet
     aria-label="Side menu">
  <div class="devsite-mobile-header">
    <button type="button"
            id="devsite-close-nav"
            class="devsite-header-icon-button button-flat material-icons gc-analytics-event"
            data-category="Site-Wide Custom Events"
            data-label="Close navigation"
            aria-label="Close navigation">
    </button>
    <div class="devsite-product-name-wrapper">

  <a href="/" class="devsite-site-logo-link gc-analytics-event"
   data-category="Site-Wide Custom Events" data-label="Site logo" track-type="globalNav"
   track-name="geminiGenerateContentAPI(Legacy)" track-metadata-position="nav"
   track-metadata-eventDetail="nav">
  
  <picture>
    
    <source srcset="https://ai.google.dev/_static/googledevai/images/gemini-api-logo-dark-theme.svg"
            media="(prefers-color-scheme: dark)"
            class="devsite-dark-theme">
    
    <img src="https://ai.google.dev/_static/googledevai/images/gemini-api-logo.svg" class="devsite-site-logo" alt="Gemini Generate Content API (Legacy)">
  </picture>
  
</a>


  
      <span class="devsite-product-name">
        
        
        <ul class="devsite-breadcrumb-list"
  >
  
  <li class="devsite-breadcrumb-item
             ">
    
    
    
      
      
    
  </li>
  
</ul>
      </span>
    

</div>
  </div>

  <div class="devsite-book-nav-wrapper">
    <div class="devsite-mobile-nav-top">
      
        <ul class="devsite-nav-list">
          
            <li class="devsite-nav-item">
              
  
  <a href="/gemini-api/docs/generate-content"
    
       class="devsite-nav-title gc-analytics-event
              
              devsite-nav-active"
    

    
      
        data-category="Site-Wide Custom Events"
      
        data-label="Tab: Gemini API"
      
        track-name="gemini api"
      
    
     data-category="Site-Wide Custom Events"
     data-label="Responsive Tab: Gemini API"
     track-type="globalNav"
     track-metadata-eventDetail="globalMenu"
     track-metadata-position="nav">
  
    <span class="devsite-nav-text" tooltip >
      Gemini API
   </span>
    
  
  </a>
  

  
              
                <ul class="devsite-nav-responsive-tabs">
                  
                    
                    
                    
                    <li class="devsite-nav-item">
                      
  
  <a href="/gemini-api/docs/generate-content"
    
       class="devsite-nav-title gc-analytics-event
              
              devsite-nav-active"
    

    
      
        data-category="Site-Wide Custom Events"
      
        data-label="Tab: Docs"
      
        track-name="docs"
      
    
     data-category="Site-Wide Custom Events"
     data-label="Responsive Tab: Docs"
     track-type="globalNav"
     track-metadata-eventDetail="globalMenu"
     track-metadata-position="nav">
  
    <span class="devsite-nav-text" tooltip menu="_book">
      Docs
   </span>
    
  
  </a>
  

  
                    </li>
                  
                    
                    
                    
                    <li class="devsite-nav-item">
                      
  
  <a href="/api"
    
       class="devsite-nav-title gc-analytics-event
              
              "
    

    
      
        data-category="Site-Wide Custom Events"
      
        data-label="Tab: API reference"
      
        track-name="api reference"
      
    
     data-category="Site-Wide Custom Events"
     data-label="Responsive Tab: API reference"
     track-type="globalNav"
     track-metadata-eventDetail="globalMenu"
     track-metadata-position="nav">
  
    <span class="devsite-nav-text" tooltip >
      API reference
   </span>
    
  
  </a>
  

  
                    </li>
                  
                </ul>
              
            </li>
          
          
    
    
<li class="devsite-nav-item">

  
  <a href="https://aistudio.google.com/apikey"
    
       class="devsite-nav-title gc-analytics-event "
    

    
      
        target="_blank"
      
    
     data-category="Site-Wide Custom Events"
     data-label="Responsive Tab: Get API key"
     track-type="navMenu"
     track-metadata-eventDetail="globalMenu"
     track-metadata-position="nav">
  
    <span class="devsite-nav-text" tooltip >
      Get API key
   </span>
    
  
  </a>
  

</li>

  
    
    
<li class="devsite-nav-item">

  
  <a href="https://github.com/google-gemini/cookbook"
    
       class="devsite-nav-title gc-analytics-event "
    

    
      
        target="_blank"
      
    
     data-category="Site-Wide Custom Events"
     data-label="Responsive Tab: Cookbook"
     track-type="navMenu"
     track-metadata-eventDetail="globalMenu"
     track-metadata-position="nav">
  
    <span class="devsite-nav-text" tooltip >
      Cookbook
   </span>
    
  
  </a>
  

</li>

  
    
    
<li class="devsite-nav-item">

  
  <a href="https://discuss.ai.google.dev/c/gemini-api/"
    
       class="devsite-nav-title gc-analytics-event "
    

    
      
        target="_blank"
      
    
     data-category="Site-Wide Custom Events"
     data-label="Responsive Tab: Community"
     track-type="navMenu"
     track-metadata-eventDetail="globalMenu"
     track-metadata-position="nav">
  
    <span class="devsite-nav-text" tooltip >
      Community
   </span>
    
  
  </a>
  

</li>

  
          
        </ul>
      
    </div>
    
      <div class="devsite-mobile-nav-bottom">
        
          
          <ul class="devsite-nav-list" menu="_book">
            <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path">
        <span class="devsite-nav-text" tooltip>Get started</span>
      </div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Overview</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/get-started"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Get started</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/api-key"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>API keys</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/pricing"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Pricing</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/coding-agents"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Coding agent setup</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path">
        <span class="devsite-nav-text" tooltip>Models</span>
      </div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/models"
        class="devsite-nav-title"
      
        alt-paths=" /gemini-api/docs/models/gemini-3.1-flash-image /gemini-api/docs/models/gemini-3.1-pro-preview /gemini-api/docs/models/gemini-3-pro-preview /gemini-api/docs/models/gemini-3-pro-image /gemini-api/docs/models/gemini-3.8-live /gemini-api/docs/models/gemini-3.8-live-extended-thinking /gemini-api/docs/models/gemini-3.8-flash-tts /gemini-api/docs/models/gemini-3.8-flash-lite-tts /gemini-api/docs/models/gemini-3.6-flash /gemini-api/docs/models/gemini-3-flash-preview /gemini-api/docs/models/gemini-3.1-flash-tts-preview /gemini-api/docs/models/gemini-3.1-flash-lite-image /gemini-api/docs/models/veo-3.1-lite-generate-preview /gemini-api/docs/models/gemini-3.1-flash-live-preview /gemini-api/docs/models/gemini-3.5-flash-lite /gemini-api/docs/models/gemini-3.1-flash-lite /gemini-api/docs/models/gemini-3.1-flash-lite-preview /gemini-api/docs/models/gemini-2.5-flash /gemini-api/docs/models/gemini-2.5-flash-preview-09-2025 /gemini-api/docs/models/gemini-2.5-flash-image /gemini-api/docs/models/gemini-2.5-flash-native-audio-preview-12-2025 /gemini-api/docs/models/gemini-2.5-flash-preview-tts /gemini-api/docs/models/gemini-2.5-flash-lite /gemini-api/docs/models/gemini-2.5-flash-lite-preview-09-2025 /gemini-api/docs/models/gemini-2.5-pro /gemini-api/docs/models/gemini-2.5-pro-preview-tts /gemini-api/docs/models/gemini-2.5-computer-use-preview-10-2025 /gemini-api/docs/models/gemini-2.0-flash /gemini-api/docs/models/gemini-2.0-flash-lite /gemini-api/docs/models/imagen /gemini-api/docs/models/veo-3.1-generate-preview /gemini-api/docs/models/veo-2.0-generate-001 /gemini-api/docs/models/gemini-embedding-001 /gemini-api/docs/models/gemini-embedding-2 /gemini-api/docs/models/gemini-robotics-er-1.5-preview /gemini-api/docs/models/gemini-robotics-er-1.6-preview /gemini-api/docs/models/deep-research-pro-preview-12-2025 /gemini-api/docs/models/deep-research-preview-04-2026 /gemini-api/docs/models/deep-research-max-preview-04-2026 /gemini-api/docs/models/lyria-realtime-exp /gemini-api/docs/models/lyria-3.5 /gemini-api/docs/models/lyria-3-clip-preview /gemini-api/docs/models/lyria-3-pro-preview /gemini-api/docs/models/gemini-omni-flash /gemini-api/docs/models/gemini-3.5-transcribe "><span class="devsite-nav-text" tooltip>All models</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/latest-model"
        class="devsite-nav-title"
      
        alt-paths=" /gemini-api/docs/generate-content/whats-new-gemini-3.7 /gemini-api/docs/generate-content/whats-new-gemini-3.6 /gemini-api/docs/generate-content/whats-new-gemini-3.5 "><span class="devsite-nav-text" tooltip>Latest Gemini models</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/image-generation"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Nano Banana</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/veo"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Veo</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/omni"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Gemini Omni Flash</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Lyria 3.5 &amp; Lyria Clip</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/music-generation"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Overview</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/realtime-music-generation"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Lyria RealTime</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/lyria-prompt-guide"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Lyria prompt guide</span></a></li></ul></div></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Text-to-speech</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/speech-generation"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Overview</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/voice-design"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Voice design</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/voice-replication"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Voice replication</span></a></li></ul></div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/transcribe"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Transcribe</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/live-api"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Live</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/live-api/live-translate"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Live translate</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/embeddings"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Embeddings</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Robotics</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/robotics-overview"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Overview</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/robotics-spatial"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Spatial reasoning</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/robotics-agentic"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Agentic vision</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/robotics-orchestration"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Task orchestration</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/robotics-streaming"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Robotics with streaming</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/robotics-video-progress"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Video understanding</span></a></li></ul></div></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path">
        <span class="devsite-nav-text" tooltip>Core capabilities</span>
      </div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/text-generation"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Text</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Image</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/image-generation"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Image generation 🍌</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/image-understanding"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Image understanding</span></a></li></ul></div></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Video</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/video"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Video overview</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/video-understanding"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Video understanding</span></a></li></ul></div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/document-processing"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Documents</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Speech and audio</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/speech-generation"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Speech generation</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/audio"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Audio understanding</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/transcribe"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Audio transcription</span></a></li></ul></div></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Thinking</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/thinking"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Thinking</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/thought-signatures"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Thought signatures</span></a></li></ul></div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/structured-output"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Structured outputs</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/function-calling"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Function calling</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/long-context"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Long context</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path">
        <span class="devsite-nav-text" tooltip>Agents</span>
      </div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/agents"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Overview</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/managed-agents-quickstart"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Quickstart</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/antigravity-agent"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Antigravity agent</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/custom-agents"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Building managed agents</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/agent-environment"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Environments</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/agent-credentials"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Credentials</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/deep-research"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Deep Research agent</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path">
        <span class="devsite-nav-text" tooltip>Tools</span>
      </div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/tools"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Overview</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/google-search"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Google Search</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/maps-grounding"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Google Maps</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/code-execution"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Code execution</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/url-context"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>URL context</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/computer-use"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Computer use</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/file-search"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>File search</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/tool-combination"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Combine tools and function calling</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path">
        <span class="devsite-nav-text" tooltip>Live API</span>
      </div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/live-api"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Overview</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Get started</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/live-api/get-started-sdk"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Get started using the GenAI SDK</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/live-api/get-started-websocket"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Get started using raw WebSockets</span></a></li></ul></div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/live-api/capabilities"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Capabilities</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-preview"><a href="/gemini-api/docs/live-api/thinking"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Thinking</span><span class="devsite-nav-icon material-icons"
        data-icon="preview"
        data-title="Preview"
        aria-hidden="true"></span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/live-api/live-transcribe"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Live transcription</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/live-api/live-translate"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Live Translation</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/live-api/tools"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Tool use</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/live-api/session-management"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Session management</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/live-api/ephemeral-tokens"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Ephemeral tokens</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/live-api/best-practices"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Best practices</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path">
        <span class="devsite-nav-text" tooltip>Optimization</span>
      </div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/optimization"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Overview</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/batch-api"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Batch API</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/webhooks"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Webhooks</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/flex-inference"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Flex inference</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/priority-inference"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Priority inference</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/caching"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Context caching</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path">
        <span class="devsite-nav-text" tooltip>Guides</span>
      </div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/interactions-overview"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Interactions API</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/streaming"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Streaming</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>File input</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/file-input-methods"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Input methods</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/files"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Files API</span></a></li></ul></div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/openai"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>OpenAI compatibility</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/media-resolution"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Media resolution</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/tokens"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Token counting</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/prompting-strategies"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Prompt engineering</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Logs and datasets</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/logs-datasets"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Get started with logs</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/logs-policy"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Data logging and sharing</span></a></li></ul></div></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Safety</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/safety-settings"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Safety settings</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/safety-guidance"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Safety guidance</span></a></li></ul></div></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Frameworks</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/langgraph-example"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>LangChain &amp; LangGraph</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/crewai-example"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>CrewAI</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/llama-index"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>LlamaIndex</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/vercel-ai-sdk-example"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Vercel AI SDK</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/temporal-example"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Temporal</span></a></li></ul></div></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path">
        <span class="devsite-nav-text" tooltip>Resources</span>
      </div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/changelog"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Release notes</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/deprecations"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Deprecations</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/libraries"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Libraries</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Migration</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/migrate"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Migrate to Gen AI SDK</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/migrate-to-interactions"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Migrate to Interactions API</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/interactions-breaking-changes-may-2026"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Interactions breaking changes (May 2026)</span></a></li></ul></div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/rate-limits"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Rate limits</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/billing"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Billing info</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/troubleshooting"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>API troubleshooting</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/generate-content/api-errors"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>API errors</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-external"><a href="https://aistudio.google.com/status"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Status</span><span class="devsite-nav-icon material-icons"
        data-icon="external"
        data-title="External"
        aria-hidden="true"></span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/partner-integration"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Partner and library integrations</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Google AI Studio</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/ai-studio-quickstart"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Quickstart</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/aistudio-build-mode"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Vibe code in Build mode</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/aistudio-fullstack"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Developing full-stack apps</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/learnlm"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Try out LearnLM</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/troubleshoot-ai-studio"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Troubleshooting</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/workspace"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Access for Workspace users</span></a></li></ul></div></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><div class="devsite-expandable-nav">
      <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button">
        <span class="devsite-nav-text" tooltip>Google Cloud Platform</span>
      </div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="/gemini-api/docs/migrate-to-cloud"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Gemini Enterprise Agent Platform Gemini API</span></a></li><li class="devsite-nav-item"><a href="/gemini-api/docs/oauth"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>OAuth authentication</span></a></li></ul></div></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path">
        <span class="devsite-nav-text" tooltip>Policies</span>
      </div></li>

  <li class="devsite-nav-item"><a href="/gemini-api/terms"
        class="devsite-nav-title"
      
        alt-paths=" /gemini-api/docs/zdr "><span class="devsite-nav-text" tooltip>Terms of service</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/available-regions"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Available regions</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/usage-policies"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Abuse monitoring</span></a></li>

  <li class="devsite-nav-item"><a href="/gemini-api/docs/feedback-policies"
        class="devsite-nav-title"
      ><span class="devsite-nav-text" tooltip>Feedback information</span></a></li>
          </ul>
        
        
          
    
  
        
        
          
    
  
    
  
        
      </div>
    
  </div>
</nav>
          
        </devsite-book-nav>
      
      <section id="gc-wrapper">
        <main role="main" id="main-content" class="devsite-main-content"
            
              has-book-nav
              has-sidebar
            >
          <div class="devsite-sidebar">
            <div class="devsite-sidebar-content">
                
                <devsite-toc class="devsite-nav"
                            role="navigation"
                            aria-label="On this page"
                            depth="2"
                            scrollbars
                            data-nosnippet
                  ></devsite-toc>
                <devsite-recommendations-sidebar class="nocontent devsite-nav" data-nosnippet>
                </devsite-recommendations-sidebar>
            </div>
          </div>
          <devsite-content>
            
              










<article class="devsite-article"><style>
      /* Styles inlined from /site-assets/css/style.css */
body[theme="googledevai-theme"] {
  --devsite-background-0: var(--devsite-background-1);
  --devsite-button-border: 1px solid #747775;
  --devsite-button-border-radius: 20rem;
  --devsite-button-font: 500 14px/36px 'Google Sans Text', Roboto, sans-serif;
  --devsite-code-font-family: 'Google Sans Mono', Roboto Mono, monospace;
  --devsite-primary-font-family: 'Google Sans Text', Roboto, sans-serif;
  --devsite-table-heading-font: 500 14px/20px 'Google Sans Text', Roboto, sans-serif;
  --googledevai-border-color: #c4c7c5;
  --googledevai-blue-light: #d7e6ff;
  --googledevai-blue-dark: #2e64de;
  --googledevai-cyan-light: #c7e4ff;
  --googledevai-cyan-dark: #3c8fe3;
  --googledevai-purple-light: #dce2ff;
  --googledevai-purple-dark: #987be9;
  --googledevai-purple: #ac87eb;
  --googledevai-red: #ee4d5d;
  --googledevai-secondary-text: #001d35;
  --googledevai-button-gradient-light: linear-gradient(90deg, var(--googledevai-blue-light), var(--googledevai-cyan-light), var(--googledevai-purple-light));
  --googledevai-button-gradient-dark: linear-gradient(90deg, var(--googledevai-blue), var(--googledevai-cyan), var(--googledevai-purple));
}

body[theme="googledevai-theme"]:not([type="reference"]){
  --googledevai-page-width: 1100px;
}

body[layout=docs][theme="googledevai-theme"]:not([type="reference"]) .devsite-main-content,
body[layout=docs][theme="googledevai-theme"]:not([type="reference"]) .devsite-main-content[has-book-nav][has-sidebar] {
  grid-template-columns: minmax(269px, 1fr) minmax(752px, var(--googledevai-page-width)) minmax(160px, 1fr);
  grid-gap: 3rem;
}

body[layout=docs][theme="googledevai-theme"] devsite-content {
  max-width: var(--googledevai-page-width);
}

body[layout=docs][theme="googledevai-theme"] .devsite-article {
  box-shadow: unset;
}

body[theme="googledevai-theme"] {
  --googledevai-header-gradient: linear-gradient(90deg, var(--googledevai-blue) 50%, var(--googledevai-cyan), var(--googledevai-purple), var(--googledevai-red));
}

body[theme="googledevai-theme"].color-scheme--dark {
  --googledevai-header-gradient: linear-gradient(90deg, var(--googledevai-blue) 75%, var(--googledevai-cyan), var(--googledevai-purple));
  --googledevai-border-color: #444746;
}

/* Ensure that full-bleed pages get the full width. */
body[theme="googledevai-theme"][layout="full"] .devsite-main-content {
  max-width: none;
  padding: 0;
}

/* And ensure that any site banners/ACL warnings/etc don't get hidden on
 * full-bleed pages. */
body[theme="googledevai-theme"][layout="full"] .devsite-banner {
  margin: 0;
}

tab:has(> a.hidden-tab) {
  display: none;
}

body[theme="googledevai-theme"] devsite-toc > .devsite-nav-list {
  border-inline-start: unset;
}

/* Banner notice */
[layout=docs] .devsite-banner:first-of-type {
  background: var(--googledevai-cyan-light);
  border-radius: 10px;
  color: var(--googledevai-secondary-text);
  margin: -2.5rem -0.25rem 2.5rem;
  display: flex;
}

/* Banner notice smaller screens */
@media (max-width: 840px) {
  [layout=docs] .devsite-banner:first-of-type {
    margin: -0.25rem -0.25rem 2.5rem;
  }
}

/* Asides */
.devsite-article-body>aside:not([class*=attempt])  {
  border-radius: 2px;
}

/* Tables */
table:not(.tfo-notebook-buttons) {
  border: 1px solid var(--googledevai-border-color);
  border-collapse: unset;
  border-radius: 9px;
  margin: auto;
  width: 100%;
}

.gemini-api-model-table tr:not(:last-child) td:not(:first-child),
.gemini-api-model-table tr:not(:last-child) th,
th,
table:not(.gemini-api-model-table):not(.tfo-notebook-buttons) tr:not(:last-child) td {
  border-bottom: 1px solid var(--googledevai-border-color);
}

th,
td {
  background: transparent;
  padding: 1rem;
}

/* Notebooks */
devsite-code .tfo-notebook-code-cell-output {
  max-height: 300px;
  overflow: auto;
  background: rgba(237, 247, 255, 1);  /* blue bg to distinguish from input code cells */
}

devsite-code .tfo-notebook-code-cell-output + .devsite-code-buttons-container button {
  background: rgba(237, 247, 255, .7);  /* blue bg to distinguish from input code cells */
}

.color-scheme--dark devsite-code .tfo-notebook-code-cell-output {
  background: rgba(var(--devsite-background-2), 1);
}

.color-scheme--dark devsite-code .tfo-notebook-code-cell-output + .devsite-code-buttons-container button {
  background: rgba(var(--devsite-background-2), .7);
}

devsite-code[dark-code] .tfo-notebook-code-cell-output {
  background: rgba(64, 78, 103, 1);  /* medium slate */
}

devsite-code[dark-code] .tfo-notebook-code-cell-output + .devsite-code-buttons-container button {
  background: rgba(64, 78, 103, .7);  /* medium slate */
}

.devsite-article-body>devsite-code {
  --devsite-code-buttons-container-right: 0;
  --devsite-code-margin: 0 0;
  --devsite-code-padding-block: 14px;
  border-radius: 8px;
}

.devsite-article-body>.beta:not([class*=attempt]),
.devsite-article-body>.caution:not([class*=attempt]),
.devsite-article-body>.deprecated:not([class*=attempt]),
.devsite-article-body>.dogfood:not([class*=attempt]),
.devsite-article-body>.experimental:not([class*=attempt]),
.devsite-article-body>.key-point:not([class*=attempt]),
.devsite-article-body>.key-term:not([class*=attempt]),
.devsite-article-body>.note:not([class*=attempt]),
.devsite-article-body>.objective:not([class*=attempt]),
.devsite-article-body>.preview:not([class*=attempt]),
.devsite-article-body>.special:not([class*=attempt]),
.devsite-article-body>.success:not([class*=attempt]),
.devsite-article-body>.tip:not([class*=attempt]),
.devsite-article-body>.warning:not([class*=attempt]),
.devsite-article-body>aside:not([class*=attempt]) {
  --devsite-notice-margin: 0 0;
  border-radius: 8px;
}

/* override default table styles for notebook buttons */
.devsite-table-wrapper .tfo-notebook-buttons {
  display: block;
  width: auto;
}

.tfo-notebook-buttons td {
  display: inline-block;
  padding: 0 16px 16px 0;
}

/* from DevSite's buttons.scss */
.tfo-notebook-buttons a,
.tfo-notebook-buttons :link,
.tfo-notebook-buttons :visited {
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  align-self: var(--devsite-button-align-self);
  background: var(--devsite-button-background, var(--devsite-background-1));
  border: var(--devsite-button-border, 0);
  border-radius: var(--devsite-button-border-radius, 2px);
  box-sizing: border-box;
  color: var(--devsite-button-color);
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font: var(--devsite-button-font, 500 14px/36px var(--devsite-primary-font-family));
  height: var(--devsite-button-height, 36px);
  letter-spacing: var(--devsite-button-letter-spacing, 0);
  line-height: var(--devsite-button-line-height, 36px);
  margin: var(--devsite-button-margin, 0);
  margin-inline-end: var(--devsite-button-margin-x-end);
  max-width: var(--devsite-button-max-width, none);
  min-width: 36px;
  outline: 0;
  overflow: hidden;
  padding: var(--devsite-button-with-icon-padding, 0 16px);
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  text-transform: var(--devsite-button-text-transform, uppercase);
  transition:
    background-color .2s,
    border .2s;
  vertical-align: middle;
  white-space: nowrap;
  width: var(--devsite-button-width, auto);
}

.tfo-notebook-buttons a:hover,
.tfo-notebook-buttons a:focus {
  background: var(--devsite-button-background-hover);
  border: var(--devsite-button-border-hover, 0);
  color: var(--devsite-button-color-hover, var(--devsite-button-color));
  text-decoration: var(--devsite-button-text-decoration-hover, none);
}

.tfo-notebook-buttons a:active {
  background: var(--devsite-button-background-active);
  border: var(--devsite-button-border-active, 0);
  transform: var(--devsite-button-transform-active, none);
}

.tfo-notebook-buttons tr {
  background: 0;
  border: 0;
}

/* on rendered notebook page,
   remove link to webpage since we're already here */
.tfo-notebook-buttons:not(.tfo-api) td:first-child {
  display: none;
}

.tfo-notebook-buttons td > a > img {
  margin: 0 8px 0 -4px;
  height: 20px;
}

[appearance='dark'] .tfo-notebook-buttons td > a > img {
  filter: invert(1);
}

@media (prefers-color-scheme: dark) {
  [appearance='device'] .tfo-notebook-buttons td > a > img {
    filter: invert(1);
  }
  .sub-heading {
    background-color: #333;
    color: #bdbdbd;
  }
}

[appearance='dark'] .sub-heading {
  background-color: #333;
  color: #bdbdbd;
}

.sub-heading {
  background-color: #f2f2f2;
  color: #5f6368;
}

@media screen and (max-width: 600px) {
  .tfo-notebook-buttons td {
    display: block;
  }
}

devsite-nav-buttons button {
  margin-left: 0;
  margin-top: 5px;
}

code {
  border-radius: 6px
}

devsite-book-nav .devsite-nav-list>.devsite-nav-heading:not(.devsite-nav-divider) {
  border-top: 0;
  padding-bottom: 0.9rem;
  font-size: 1rem;
}

/*
 * TODO(b/439059414): Remove this workaround in favor of a project-level
 * body_class when possible.
 */
.ais-theme-marker {
  display: none;
}

/*
 * Gemini API body class.
 * https://source.corp.google.com/piper///depot/google3/third_party/devsite/googledevai/en/gemini-api/_project.yaml;l=7
 */
.gemini-api devsite-thumb-rating[position="header"],
.gemini-api devsite-feedback[position="header"] {
  /* Hide the thumb rating and feedback widgets at the top of the page. */
  display: none;
}

/*
 * Shaded table styles look like a .pricing-table but are more flexible around
 * content sizes in each column.
 */
.shaded-table {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.shaded-table th {
  background-color: #f2f2f2;
  text-align: left;
  padding: 8px;
}

/* These should use theme colours for light too, so we don't
 * need an override. */
.color-scheme--dark .shaded-table th {
  background-color: var(--devsite-ref-palette--grey800);
}

.shaded-table td {
    padding: 8px;
}

.shaded-table th:first-child {
  border-top-left-radius: 8px;
}

.shaded-table th:last-child {
  border-top-right-radius: 8px;
}

.shaded-table tr:last-child td:first-child {
  border-bottom-left-radius: 8px;
}

.shaded-table tr:last-child td:last-child {
  border-bottom-right-radius: 8px;
}

.devsite-nav {
    font-size: var(--devsite-nav-font-size, 14px);
}

.devsite-nav-item {
    line-height: var(--devsite-nav-item-line-height, 20px);
}

.devsite-book-nav-bg, devsite-book-nav {
    width: 210px;
    scrollbar-width: thin;
}

/* Hide the old toggle button immediately */
.devsite-expandable-nav > .devsite-nav-toggle {
    display: none !important;
}

/* Ion setup: Default State (Chevron Right) */
.devsite-expandable-nav > .devsite-nav-title::after {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 18px;
    line-height: 1;
    color: #888;
    /* Default: Chevron Right */
    content: "\e5cc";
    flex-shrink: 0;
    margin-left: 8px;
}

/* Down state logic */
.devsite-expandable-nav.expanded > .devsite-nav-title::after,
.devsite-expandable-nav:has(.devsite-nav-active) > .devsite-nav-title::after,
.devsite-expandable-nav > .devsite-nav-title[aria-expanded="true"]::after {
    content: "\e313";
}

/* Close state logic */
.devsite-expandable-nav > .devsite-nav-title[aria-expanded="false"]::after {
    content: "\e5cc" !important;
}

/* Hovercard styling */
.gemini-api .heading:has(devsite-gemini-api-hovercard-button) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gemini-api .heading:has(devsite-gemini-api-hovercard-button) h1 {
  margin-bottom: 0;
}

devsite-gemini-api-hovercard,
devsite-gemini-api-hovercard-button {
  /* Render above any code blocks on the page */
  z-index: 1;
}

.devsite-nav-icon[data-icon="beta"], .devsite-nav-icon[data-icon="preview"],
.devsite-nav-icon[data-icon="experimental"] {
  margin: -5px 0 -1px 4px;
}
      </style><style>
      /* Styles inlined from /site-assets/css/pricing.css */
/* Pricing table styles */

.pricing-table {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.pricing-table th {
  background-color: #f2f2f2;
  text-align: left;
  padding: 8px;
}

/* Set the second and after (of three total) columns to 35% width. */
.pricing-table th:nth-child(n+2) {
  width: 35%;
}

/* These should use theme colours for light too, so we don't
 * need an override. */
.color-scheme--dark .pricing-table th {
  background-color: var(--devsite-ref-palette--grey800);
}

.pricing-table td {
    padding: 8px;
}

.free-tier {
  background-color: none;
}

.paid-tier {
  background-color: #eff5ff;
}

.color-scheme--dark .paid-tier {
  background-color: var(--devsite-background-5);
}

.pricing-table th:first-child {
  border-top-left-radius: 8px;
}

.pricing-table th:last-child {
  border-top-right-radius: 8px;
}

.pricing-table tr:last-child td:first-child {
  border-bottom-left-radius: 8px;
}

.pricing-table tr:last-child td:last-child {
  border-bottom-right-radius: 8px;
}

.pricing-container {
    max-width: 1100px;
    width: 100%;
}

.pricing-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    justify-content: center;
}

.pricing-card {
    background-color: #ffffff;
    border-radius: 16px; 
    border: 1px solid #dadce0;
    padding: 2.5rem;
    display: flex;
    flex-direction: column; 
    transition: all 0.3s ease;
    position: relative; 
}

.color-scheme--dark .pricing-card {
  background-color: var(--devsite-ref-palette--grey800);
}

.plan-name {
    font-size: 1.75rem;
    font-weight: 700; 
    margin: 0 0 0.5rem 0;
}

.plan-description {
    font-size: 1rem;
    color: #5f6368;
    margin: 0 0 2.5rem 0;
    line-height: 1.5;
    min-height: 80px;
}

.color-scheme--dark .plan-description {
  color: var(--devsite-primary-text-color);
}

.plan-description a {
    color: #1a73e8;
    text-decoration: none;
}
.plan-description a:hover {
    text-decoration: underline;
}

.features {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
}

.features li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.25rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #3c4043;
}

.features li.feature-description {
    display: block;
    color: #5f6368;
}

.features li a {
    color: #1a73e8;
    text-decoration: none;
    margin-left: 4px;
}

.features li .material-symbols-outlined {
    font-size: 24px;
    margin-right: 0.75rem;
    color: #3c4043;
    margin-top: 2px;
}

.color-scheme--dark .features li,
.features li .material-symbols-outlined {
  color: var(--devsite-primary-text-color);
}

.cta-button {
    display: inline-block;
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
    box-sizing: border-box;
    border: 1px solid #dadce0;
    background-color: #fff;
    color: #1a73e8;
    margin-top: auto;
}

.cta-button:hover {
    background-color: rgba(66, 133, 244, 0.05); 
}

.pricing-card.recommended {
    border: 2px solid #1a73e8;
    overflow: hidden; 
}

.pricing-card.recommended::before {
    position: absolute;
    top: 22px;
    right: -32px;
    width: 120px;
    height: 30px;
    background-color: #1a73e8;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    transform: rotate(45deg);
    z-index: 1; 
}

.heading-group {
    display: flex;
    flex-direction: column;
}

.heading-group h2 {
    margin-bottom: 0;
}

.heading-group em {
    margin-top: 0;
}

.row-gray {
  background-color: #f2f2f2; /* Light gray */
  color: #666666;
  font-style: italic;
}

.row-gray code {
  font-style: italic;
}

      </style>
  
  
  
    <div class="devsite-banner devsite-banner-announcement nocontent" data-nosnippet
      
        
    background="google-blue"
  
      >
      <div class="devsite-banner-message">
        <div class="devsite-banner-message-text">
          Gemini 3.8 Flash is now available. <a href="https://aistudio.google.com/prompts/new_chat?model=gemini-3.8-flash" style="color: black;">Try it out</a>.
        </div>
      </div>
    </div>
  
  
  

  <div class="devsite-article-meta nocontent" role="navigation" data-nosnippet>
    
    
    <ul class="devsite-breadcrumb-list"
  
    aria-label="Breadcrumb">
  
  <li class="devsite-breadcrumb-item
             ">
    
    
    
      
        
  <a href="https://ai.google.dev/"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="1"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="1"
      
        track-metadata-eventdetail=""
      
    >
    
          Home
        
  </a>
  
      
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
        
  <a href="https://ai.google.dev/gemini-api"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="2"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="2"
      
        track-metadata-eventdetail="Gemini API"
      
    >
    
          Gemini API
        
  </a>
  
      
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
        
  <a href="https://ai.google.dev/gemini-api/docs/generate-content/get-started"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="3"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="3"
      
        track-metadata-eventdetail="Gemini Generate Content API (Legacy)"
      
    >
    
          Generate Content API
        
  </a>
  
      
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
        
  <a href="https://ai.google.dev/gemini-api/docs/generate-content"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="4"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="4"
      
        track-metadata-eventdetail=""
      
    >
    
          Docs
        
  </a>
  
      
    
  </li>
  
</ul>
    
      
    <devsite-thumb-rating position="header">
    </devsite-thumb-rating>
  
    
    <devsite-gemini-api-switcher class="nocontent"></devsite-gemini-api-switcher>
  </div>
  
    <devsite-feedback
  position="header"
  project-name="Gemini Generate Content API (Legacy)"
  product-id="5292923"
  bucket="documentation"
  context=""
  version="t-devsite-webserver-20261006-r00-rc02.480918341592349554"
  data-label="Send Feedback Button"
  track-type="feedback"
  track-name="sendFeedbackLink"
  track-metadata-position="header"
  class="nocontent"
  data-nosnippet
  
  
  
    project-icon="https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/googledevai/images/touchicon-180-new.png"
  
  
  
  >

  <button>
  
    
    Send feedback
  
  </button>
</devsite-feedback>
  
    <h1 class="devsite-page-title" tabindex="-1">
      Text-to-speech generation (TTS)<devsite-actions hidden data-nosnippet>
    <devsite-llm-tools></devsite-llm-tools></devsite-actions>
  
      
    </h1>
  <div class="devsite-page-title-meta"><devsite-view-release-notes></devsite-view-release-notes></div>
  

  <devsite-toc class="devsite-nav"
    depth="2"
    devsite-toc-embedded
    >
  </devsite-toc>
  
    
  <div class="devsite-article-body clearfix
  ">

  
    
    


<div id="gemini-api-switcher-trigger" style="display:none;"></div>

<p>
</p>

<p></p>



<p>The Gemini API can transform text input into single-speaker or multi-speaker
audio using Gemini text-to-speech (TTS) generation capabilities.
Text-to-speech generation is
<em><a href="/gemini-api/docs/generate-content/speech-generation#controllable">controllable</a></em>,
meaning you can combine structured turn metadata (<code translate="no" dir="ltr">speech_metadata</code>) and inline
vocal tags to guide the <em>style</em>, <em>accent</em>, <em>pace</em>, and <em>tone</em> of the audio.</p>

<div style="text-align: center;">
  <a href="https://aistudio.google.com/generate-speech" class="button button-primary">Try in Google AI Studio</a>
</div>

<p>The TTS capability differs from speech generation provided through the
<a href="/gemini-api/docs/live">Live API</a>, which is designed for interactive,
unstructured audio, and multimodal inputs and outputs. While the Live API excels
in dynamic conversational contexts, TTS through the Gemini API
is tailored for scenarios that require exact text recitation with fine-grained
control over style and sound, such as podcast or audiobook generation.</p>

<p>This guide shows you how to generate single-speaker and multi-speaker audio from
text using <a href="/gemini-api/docs/models/gemini-3.8-flash-tts">Gemini 3.8 Flash TTS</a>
(<code translate="no" dir="ltr">gemini-3.8-flash-tts</code>) and
<a href="/gemini-api/docs/models/gemini-3.8-flash-lite-tts">Gemini 3.8 Flash-Lite TTS</a>
(<code translate="no" dir="ltr">gemini-3.8-flash-lite-tts</code>).</p>

<h2 id="before-you-begin" class="hide-from-toc" data-text="Before you begin" tabindex="-1">Before you begin</h2>

<p>Ensure you use a Gemini TTS model listed in the
<a href="/gemini-api/docs/generate-content/speech-generation#supported-models">Supported models</a>
section. For optimal results, review
<a href="/gemini-api/docs/generate-content/speech-generation#when-to-use-which-model">When to use which model</a>
to select the best model for your workload.</p>

<p>You may find it useful to
<a href="https://aistudio.google.com/generate-speech">test the Gemini TTS models in AI Studio</a>
before you start building.</p>
<aside class="note"><strong>Note:</strong><span> TTS models accept text-only inputs and produce audio-only outputs. For a
complete list of restrictions specific to TTS models, review the
<a href="/gemini-api/docs/generate-content/speech-generation#limitations">Limitations</a>
section.</span></aside>
<h2 id="single-speaker" data-text="Single-speaker TTS" tabindex="-1">Single-speaker TTS</h2>

<p>To convert text to single-speaker audio with Gemini 3.8 TTS models, pass the
verbatim transcript in <code translate="no" dir="ltr">parts[].text</code>, attach turn-level styling in
<code translate="no" dir="ltr">parts[].speech_metadata</code>, and configure your voice in
<code translate="no" dir="ltr">speechConfig.voiceConfig</code>. You can pass a prebuilt voice name, an Extended
Voice Library ID, a custom
<a href="/gemini-api/docs/generate-content/voice-design">Voice design</a> ID (<code translate="no" dir="ltr">voice_...</code>),
or a <a href="/gemini-api/docs/generate-content/voice-replication">Voice replication</a> ID
(<code translate="no" dir="ltr">voice_...</code>, or optional stateless <code translate="no" dir="ltr">voicekey_...</code>).</p>

<p>This example saves the output audio from the model in a WAV file:</p>
<div><devsite-selector data-ds-scope="code-sample">
<section><h3 id="python" data-text="Python" tabindex="-1">Python</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Python"><code translate="no" dir="ltr"><span class="devsite-syntax-kn">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">google</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kn">import</span> <span class="devsite-syntax-n">genai</span>

<span class="devsite-syntax-n">client</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">genai</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">Client</span><span class="devsite-syntax-p">()</span>

<span class="devsite-syntax-n">response</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">client</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">models</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">generate_content</span><span class="devsite-syntax-p">(</span>
    <span class="devsite-syntax-n">model</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-s2">"gemini-3.8-flash-tts"</span><span class="devsite-syntax-p">,</span>
    <span class="devsite-syntax-n">contents</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">[{</span>
        <span class="devsite-syntax-s2">"role"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"user"</span><span class="devsite-syntax-p">,</span>
        <span class="devsite-syntax-s2">"parts"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">[{</span>
            <span class="devsite-syntax-s2">"text"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Have a wonderful day!"</span><span class="devsite-syntax-p">,</span>
            <span class="devsite-syntax-s2">"speech_metadata"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span><span class="devsite-syntax-s2">"style"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"cheerful and friendly"</span><span class="devsite-syntax-p">},</span>
        <span class="devsite-syntax-p">}],</span>
    <span class="devsite-syntax-p">}],</span>
    <span class="devsite-syntax-n">config</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">{</span>
        <span class="devsite-syntax-s2">"response_modalities"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"AUDIO"</span><span class="devsite-syntax-p">],</span>
        <span class="devsite-syntax-s2">"speech_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
            <span class="devsite-syntax-s2">"voice_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span><span class="devsite-syntax-s2">"voice"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Kore"</span><span class="devsite-syntax-p">}</span>
        <span class="devsite-syntax-p">},</span>
    <span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-n">data</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">response</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">candidates</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">content</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">parts</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">inline_data</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">data</span>
<span class="devsite-syntax-k">with</span> <span class="devsite-syntax-nb">open</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"out.wav"</span><span class="devsite-syntax-p">,</span> <span class="devsite-syntax-s2">"wb"</span><span class="devsite-syntax-p">)</span> <span class="devsite-syntax-k">as</span> <span class="devsite-syntax-n">f</span><span class="devsite-syntax-p">:</span>
    <span class="devsite-syntax-n">f</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">write</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">data</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code></section>
<section><h3 id="javascript" data-text="JavaScript" tabindex="-1">JavaScript</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="JavaScript"><code translate="no" dir="ltr"><span class="devsite-syntax-k">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-nx">GoogleGenAI</span><span class="devsite-syntax-p">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'@google/genai'</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-k">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">fs</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'node:fs'</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-k">async</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kd">function</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">main</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">ai</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-ow">new</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">GoogleGenAI</span><span class="devsite-syntax-p">({});</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">response</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">ai</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">models</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">generateContent</span><span class="devsite-syntax-p">({</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">model</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'gemini-3.8-flash-tts'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">contents</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[{</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">role</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'user'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">parts</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[{</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">text</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Have a wonderful day!'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">speechMetadata</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">style</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'cheerful and friendly'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-p">}],</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-p">}],</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">config</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">responseModalities</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s1">'AUDIO'</span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">speechConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">voiceConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Kore'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-p">});</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">response</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">candidates</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.[</span><span class="devsite-syntax-mf">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">content</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">parts</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.[</span><span class="devsite-syntax-mf">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">inlineData</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">audioBuffer</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">Buffer</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'base64'</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-nx">fs</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">writeFileSync</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'out.wav'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">audioBuffer</span><span class="devsite-syntax-p">);</span>
<span class="devsite-syntax-p">}</span>
<span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">main</span><span class="devsite-syntax-p">();</span>
</code></pre></devsite-code></section>
<section><h3 id="rest" data-text="REST" tabindex="-1">REST</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Bash"><code translate="no" dir="ltr">curl<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-H<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"x-goog-api-key: </span><span class="devsite-syntax-nv">$GEMINI_API_KEY</span><span class="devsite-syntax-s2">"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-X<span class="devsite-syntax-w"> </span>POST<span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-H<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"Content-Type: application/json"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-d<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'{</span>
<span class="devsite-syntax-s1">        "contents": [{</span>
<span class="devsite-syntax-s1">          "role": "user",</span>
<span class="devsite-syntax-s1">          "parts": [{</span>
<span class="devsite-syntax-s1">            "text": "Have a wonderful day!",</span>
<span class="devsite-syntax-s1">            "speech_metadata": {</span>
<span class="devsite-syntax-s1">              "style": "cheerful and friendly"</span>
<span class="devsite-syntax-s1">            }</span>
<span class="devsite-syntax-s1">          }]</span>
<span class="devsite-syntax-s1">        }],</span>
<span class="devsite-syntax-s1">        "generationConfig": {</span>
<span class="devsite-syntax-s1">          "responseModalities": ["AUDIO"],</span>
<span class="devsite-syntax-s1">          "speechConfig": {</span>
<span class="devsite-syntax-s1">            "voiceConfig": {</span>
<span class="devsite-syntax-s1">              "voice": "Kore"</span>
<span class="devsite-syntax-s1">            }</span>
<span class="devsite-syntax-s1">          }</span>
<span class="devsite-syntax-s1">        }</span>
<span class="devsite-syntax-s1">    }'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">|</span><span class="devsite-syntax-w"> </span>jq<span class="devsite-syntax-w"> </span>-r<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'.candidates[0].content.parts[0].inlineData.data'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">          </span>base64<span class="devsite-syntax-w"> </span>--decode<span class="devsite-syntax-w"> &gt; </span>out.wav
</code></pre></devsite-code></section>
</devsite-selector></div>
<h2 id="multi-speaker" data-text="Multi-speaker TTS" tabindex="-1">Multi-speaker TTS</h2>

<p>For multi-speaker dialogue, configure two speakers in
<code translate="no" dir="ltr">multiSpeakerVoiceConfig.speakerVoiceConfigs</code> using <code translate="no" dir="ltr">prebuiltVoiceConfig</code> and
pass each dialogue turn as a separate <code translate="no" dir="ltr">part</code> with <code translate="no" dir="ltr">speech_metadata</code> specifying
both <code translate="no" dir="ltr">speaker</code> and optional turn-level <code translate="no" dir="ltr">style</code>:</p>
<div><devsite-selector data-ds-scope="code-sample">
<section><h3 id="python_1" data-text="Python" tabindex="-1">Python</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Python"><code translate="no" dir="ltr"><span class="devsite-syntax-kn">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">google</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kn">import</span> <span class="devsite-syntax-n">genai</span>

<span class="devsite-syntax-n">client</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">genai</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">Client</span><span class="devsite-syntax-p">()</span>

<span class="devsite-syntax-n">response</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">client</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">models</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">generate_content</span><span class="devsite-syntax-p">(</span>
    <span class="devsite-syntax-n">model</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-s2">"gemini-3.8-flash-tts"</span><span class="devsite-syntax-p">,</span>
    <span class="devsite-syntax-n">contents</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">[{</span>
        <span class="devsite-syntax-s2">"role"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"user"</span><span class="devsite-syntax-p">,</span>
        <span class="devsite-syntax-s2">"parts"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">[</span>
            <span class="devsite-syntax-p">{</span>
                <span class="devsite-syntax-s2">"text"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"How's it going today Jane?"</span><span class="devsite-syntax-p">,</span>
                <span class="devsite-syntax-s2">"speech_metadata"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
                    <span class="devsite-syntax-s2">"speaker"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Joe"</span><span class="devsite-syntax-p">,</span>
                    <span class="devsite-syntax-s2">"style"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"cheerful and friendly"</span><span class="devsite-syntax-p">,</span>
                <span class="devsite-syntax-p">},</span>
            <span class="devsite-syntax-p">},</span>
            <span class="devsite-syntax-p">{</span>
                <span class="devsite-syntax-s2">"text"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Not too bad, how about you? Ready to test these new voices?"</span><span class="devsite-syntax-p">,</span>
                <span class="devsite-syntax-s2">"speech_metadata"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
                    <span class="devsite-syntax-s2">"speaker"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Jane"</span><span class="devsite-syntax-p">,</span>
                    <span class="devsite-syntax-s2">"style"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"calm and relaxed"</span><span class="devsite-syntax-p">,</span>
                <span class="devsite-syntax-p">},</span>
            <span class="devsite-syntax-p">},</span>
        <span class="devsite-syntax-p">],</span>
    <span class="devsite-syntax-p">}],</span>
    <span class="devsite-syntax-n">config</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">{</span>
        <span class="devsite-syntax-s2">"response_modalities"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"AUDIO"</span><span class="devsite-syntax-p">],</span>
        <span class="devsite-syntax-s2">"speech_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
            <span class="devsite-syntax-s2">"multi_speaker_voice_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
                <span class="devsite-syntax-s2">"speaker_voice_configs"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">[</span>
                    <span class="devsite-syntax-p">{</span>
                        <span class="devsite-syntax-s2">"speaker"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Joe"</span><span class="devsite-syntax-p">,</span>
                        <span class="devsite-syntax-s2">"voice_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
                            <span class="devsite-syntax-s2">"prebuilt_voice_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span><span class="devsite-syntax-s2">"voice_name"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Puck"</span><span class="devsite-syntax-p">}</span>
                        <span class="devsite-syntax-p">},</span>
                    <span class="devsite-syntax-p">},</span>
                    <span class="devsite-syntax-p">{</span>
                        <span class="devsite-syntax-s2">"speaker"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Jane"</span><span class="devsite-syntax-p">,</span>
                        <span class="devsite-syntax-s2">"voice_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
                            <span class="devsite-syntax-s2">"prebuilt_voice_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span><span class="devsite-syntax-s2">"voice_name"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Kore"</span><span class="devsite-syntax-p">}</span>
                        <span class="devsite-syntax-p">},</span>
                    <span class="devsite-syntax-p">},</span>
                <span class="devsite-syntax-p">]</span>
            <span class="devsite-syntax-p">}</span>
        <span class="devsite-syntax-p">},</span>
    <span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-n">data</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">response</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">candidates</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">content</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">parts</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">inline_data</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">data</span>
<span class="devsite-syntax-k">with</span> <span class="devsite-syntax-nb">open</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"out.wav"</span><span class="devsite-syntax-p">,</span> <span class="devsite-syntax-s2">"wb"</span><span class="devsite-syntax-p">)</span> <span class="devsite-syntax-k">as</span> <span class="devsite-syntax-n">f</span><span class="devsite-syntax-p">:</span>
    <span class="devsite-syntax-n">f</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">write</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">data</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code></section>
<section><h3 id="javascript_1" data-text="JavaScript" tabindex="-1">JavaScript</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="JavaScript"><code translate="no" dir="ltr"><span class="devsite-syntax-k">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-nx">GoogleGenAI</span><span class="devsite-syntax-p">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'@google/genai'</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-k">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">fs</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'node:fs'</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-k">async</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kd">function</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">main</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">ai</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-ow">new</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">GoogleGenAI</span><span class="devsite-syntax-p">({});</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">response</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">ai</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">models</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">generateContent</span><span class="devsite-syntax-p">({</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">model</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'gemini-3.8-flash-tts'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">contents</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[{</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">role</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'user'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">parts</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">               </span><span class="devsite-syntax-nx">text</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"How's it going today Jane?"</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">               </span><span class="devsite-syntax-nx">speechMetadata</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">                  </span><span class="devsite-syntax-nx">speaker</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Joe'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">                  </span><span class="devsite-syntax-nx">style</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'cheerful and friendly'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">               </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">               </span><span class="devsite-syntax-nx">text</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Not too bad, how about you? Ready to test these new voices?'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">               </span><span class="devsite-syntax-nx">speechMetadata</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">                  </span><span class="devsite-syntax-nx">speaker</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jane'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">                  </span><span class="devsite-syntax-nx">style</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'calm and relaxed'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">               </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-p">}],</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">config</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">responseModalities</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s1">'AUDIO'</span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">speechConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">multiSpeakerVoiceConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">               </span><span class="devsite-syntax-nx">speakerVoiceConfigs</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span>
<span class="devsite-syntax-w">                  </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">                     </span><span class="devsite-syntax-nx">speaker</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Joe'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">                     </span><span class="devsite-syntax-nx">voiceConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">                        </span><span class="devsite-syntax-nx">prebuiltVoiceConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">voiceName</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Puck'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">                     </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">                  </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">                  </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">                     </span><span class="devsite-syntax-nx">speaker</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jane'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">                     </span><span class="devsite-syntax-nx">voiceConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">                        </span><span class="devsite-syntax-nx">prebuiltVoiceConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">voiceName</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Kore'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">                     </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">                  </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">               </span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-p">});</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">response</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">candidates</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.[</span><span class="devsite-syntax-mf">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">content</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">parts</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.[</span><span class="devsite-syntax-mf">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">inlineData</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">audioBuffer</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">Buffer</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'base64'</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-nx">fs</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">writeFileSync</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'out.wav'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">audioBuffer</span><span class="devsite-syntax-p">);</span>
<span class="devsite-syntax-p">}</span>

<span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">main</span><span class="devsite-syntax-p">();</span>
</code></pre></devsite-code></section>
<section><h3 id="rest_1" data-text="REST" tabindex="-1">REST</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Bash"><code translate="no" dir="ltr">curl<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-H<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"x-goog-api-key: </span><span class="devsite-syntax-nv">$GEMINI_API_KEY</span><span class="devsite-syntax-s2">"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-X<span class="devsite-syntax-w"> </span>POST<span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-H<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"Content-Type: application/json"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-d<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'{</span>
<span class="devsite-syntax-s1">    "contents": [{</span>
<span class="devsite-syntax-s1">      "role": "user",</span>
<span class="devsite-syntax-s1">      "parts": [</span>
<span class="devsite-syntax-s1">        {</span>
<span class="devsite-syntax-s1">          "text": "How'</span><span class="devsite-syntax-se">\'</span><span class="devsite-syntax-s1">'s it going today Jane?",</span>
<span class="devsite-syntax-s1">          "speech_metadata": {</span>
<span class="devsite-syntax-s1">            "speaker": "Joe",</span>
<span class="devsite-syntax-s1">            "style": "cheerful and friendly"</span>
<span class="devsite-syntax-s1">          }</span>
<span class="devsite-syntax-s1">        },</span>
<span class="devsite-syntax-s1">        {</span>
<span class="devsite-syntax-s1">          "text": "Not too bad, how about you? Ready to test these new voices?",</span>
<span class="devsite-syntax-s1">          "speech_metadata": {</span>
<span class="devsite-syntax-s1">            "speaker": "Jane",</span>
<span class="devsite-syntax-s1">            "style": "calm and relaxed"</span>
<span class="devsite-syntax-s1">          }</span>
<span class="devsite-syntax-s1">        }</span>
<span class="devsite-syntax-s1">      ]</span>
<span class="devsite-syntax-s1">    }],</span>
<span class="devsite-syntax-s1">    "generationConfig": {</span>
<span class="devsite-syntax-s1">      "responseModalities": ["AUDIO"],</span>
<span class="devsite-syntax-s1">      "speechConfig": {</span>
<span class="devsite-syntax-s1">        "multiSpeakerVoiceConfig": {</span>
<span class="devsite-syntax-s1">          "speakerVoiceConfigs": [</span>
<span class="devsite-syntax-s1">            {</span>
<span class="devsite-syntax-s1">              "speaker": "Joe",</span>
<span class="devsite-syntax-s1">              "voiceConfig": {</span>
<span class="devsite-syntax-s1">                "prebuiltVoiceConfig": { "voiceName": "Puck" }</span>
<span class="devsite-syntax-s1">              }</span>
<span class="devsite-syntax-s1">            },</span>
<span class="devsite-syntax-s1">            {</span>
<span class="devsite-syntax-s1">              "speaker": "Jane",</span>
<span class="devsite-syntax-s1">              "voiceConfig": {</span>
<span class="devsite-syntax-s1">                "prebuiltVoiceConfig": { "voiceName": "Kore" }</span>
<span class="devsite-syntax-s1">              }</span>
<span class="devsite-syntax-s1">            }</span>
<span class="devsite-syntax-s1">          ]</span>
<span class="devsite-syntax-s1">        }</span>
<span class="devsite-syntax-s1">      }</span>
<span class="devsite-syntax-s1">    }</span>
<span class="devsite-syntax-s1">  }'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">|</span><span class="devsite-syntax-w"> </span>jq<span class="devsite-syntax-w"> </span>-r<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'.candidates[0].content.parts[0].inlineData.data'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">      </span>base64<span class="devsite-syntax-w"> </span>--decode<span class="devsite-syntax-w"> &gt; </span>out.wav
</code></pre></devsite-code></section>
</devsite-selector></div>
<h2 id="controllable" data-text="Control speech style with metadata and tags" tabindex="-1">Control speech style with metadata and tags</h2>

<p>Gemini 3.8 TTS treats the <code translate="no" dir="ltr">text</code> field strictly as a verbatim transcript. To
control delivery without having stage directions read aloud, split your
instructions by scope:</p>

<ul>
<li><strong>Sustained turn-level delivery (<code translate="no" dir="ltr">speech_metadata.style</code>):</strong> Put emotions,
delivery style, prosody, pacing, and volume that apply across an entire turn
in <code translate="no" dir="ltr">speech_metadata.style</code> (for example, <code translate="no" dir="ltr">&quot;style&quot;: &quot;whispered urgently&quot;</code>,
<code translate="no" dir="ltr">&quot;style&quot;: &quot;out of breath&quot;</code>, or <code translate="no" dir="ltr">&quot;style&quot;: &quot;warm and enthusiastic&quot;</code>).</li>
<li><strong>Point-in-time events (inline tags):</strong> Place momentary non-speech vocal
bursts or pauses directly inside the transcript using angle brackets (for
example, <code translate="no" dir="ltr">&quot;Wait... &lt;short pause&gt; did you hear that? &lt;sigh&gt;&quot;</code> or
<code translate="no" dir="ltr">&quot;Excuse me &lt;cough&gt; as I was saying...&quot;</code>).</li>
</ul>

<p>See the
<a href="/gemini-api/docs/generate-content/speech-generation#prompting-guide">Prompting guide</a>
for comprehensive best practices.</p>

<h2 id="voices" data-text="Voice options" tabindex="-1">Voice options</h2>

<p>Gemini 3.8 TTS supports four ways to select or create voices:</p>

<ol>
<li><strong>Prebuilt studio voices:</strong> 30 curated voices listed in the following table.</li>
<li><strong>Extended Voice Library:</strong> Hundreds of additional voices across languages,
accents, and character archetypes accessible using <code translate="no" dir="ltr">client.voices.list()</code>
(<code translate="no" dir="ltr">GET /v1beta/voices</code>).</li>
<li><strong><a href="/gemini-api/docs/generate-content/voice-design">Voice design</a>:</strong> Generate
a custom vocal persona from a natural-language description in
<a href="https://aistudio.google.com/generate-speech">Google AI Studio</a> or using
<code translate="no" dir="ltr">POST /v1beta/voices</code> (<code translate="no" dir="ltr">type=&quot;prompted&quot;</code>, which returns a persistent
<code translate="no" dir="ltr">voice_...</code> ID and a <code translate="no" dir="ltr">sample_audio</code> WAV preview in <code translate="no" dir="ltr">CreateVoice</code> and
<code translate="no" dir="ltr">GetVoice</code>).</li>
<li><strong><a href="/gemini-api/docs/generate-content/voice-replication">Voice replication</a>:</strong>
Replicate a speaker&#39;s voice from reference and consent audio in
<a href="https://aistudio.google.com/generate-speech">Google AI Studio</a> or using
<code translate="no" dir="ltr">POST /v1beta/voices</code> (<code translate="no" dir="ltr">type=&quot;replicated&quot;</code>, persistent <code translate="no" dir="ltr">store=True</code> by
default or optional stateless <code translate="no" dir="ltr">store=False</code>).</li>
</ol>

<h3 id="custom-voice-limits" data-text="Custom voice limits and TTL" tabindex="-1">Custom voice limits and TTL</h3>

<table>
<thead>
<tr>
<th style="text-align: left">Voice type</th>
<th style="text-align: left">Storage mode</th>
<th style="text-align: left">Quota / limit</th>
<th style="text-align: left">Retention (TTL)</th>
</tr>
</thead>

<tbody>
<tr>
<td style="text-align: left"><strong>Stateful voices</strong> (<code translate="no" dir="ltr">voice_...</code>, prompted or replicated)</td>
<td style="text-align: left"><code translate="no" dir="ltr">store=True</code></td>
<td style="text-align: left"><strong>200 voices per project</strong> (shared across prompted and replicated voices)</td>
<td style="text-align: left"><strong>1 year from last use*</strong></td>
</tr>
<tr>
<td style="text-align: left"><strong>Stateless voice keys</strong> (<code translate="no" dir="ltr">voicekey_...</code>, replicated)</td>
<td style="text-align: left"><code translate="no" dir="ltr">store=False</code></td>
<td style="text-align: left">Client-managed</td>
<td style="text-align: left"><strong>7 days</strong></td>
</tr>
</tbody>
</table>

<p>* <strong>TTL extension:</strong> The 1-year retention window resets each time the voice is actively used (either by synthesizing speech with the voice or using it as a base voice for remixing). Voices with no activity for 1 year are automatically deleted.</p>

<h3 id="prebuilt_voices" data-text="Prebuilt voices" tabindex="-1">Prebuilt voices</h3>

<div>
<table>
  <colgroup>
    <col class="paid-tier">
    <col>
    <col class="paid-tier">
  </colgroup>
  <tbody>
  <tr>
    <td><b>Zephyr</b> -- <em>Bright</em></td>
    <td><b>Puck</b> -- <em>Upbeat</em></td>
    <td><b>Charon</b> -- <em>Informative</em></td>
  </tr>
  <tr>
    <td><b>Kore</b> -- <em>Firm</em></td>
    <td><b>Fenrir</b> -- <em>Excitable</em></td>
    <td><b>Leda</b> -- <em>Youthful</em></td>
  </tr>
  <tr>
    <td><b>Orus</b> -- <em>Firm</em></td>
    <td><b>Aoede</b> -- <em>Breezy</em></td>
    <td><b>Callirrhoe</b> -- <em>Easy-going</em></td>
  </tr>
  <tr>
    <td><b>Autonoe</b> -- <em>Bright</em></td>
    <td><b>Enceladus</b> -- <em>Breathy</em></td>
    <td><b>Iapetus</b> -- <em>Clear</em></td>
  </tr>
  <tr>
    <td><b>Umbriel</b> -- <em>Easy-going</em></td>
    <td><b>Algieba</b> -- <em>Smooth</em></td>
    <td><b>Despina</b> -- <em>Smooth</em></td>
  </tr>
  <tr>
    <td><b>Erinome</b> -- <em>Clear</em></td>
    <td><b>Algenib</b> -- <em>Gravelly</em></td>
    <td><b>Rasalgethi</b> -- <em>Informative</em></td>
  </tr>
  <tr>
    <td><b>Laomedeia</b> -- <em>Upbeat</em></td>
    <td><b>Achernar</b> -- <em>Soft</em></td>
    <td><b>Alnilam</b> -- <em>Firm</em></td>
  </tr>
  <tr>
    <td><b>Schedar</b> -- <em>Even</em></td>
    <td><b>Gacrux</b> -- <em>Mature</em></td>
    <td><b>Pulcherrima</b> -- <em>Forward</em></td>
  </tr>
  <tr>
    <td><b>Achird</b> -- <em>Friendly</em></td>
    <td><b>Zubenelgenubi</b> -- <em>Casual</em></td>
    <td><b>Vindemiatrix</b> -- <em>Gentle</em></td>
  </tr>
  <tr>
    <td><b>Sadachbia</b> -- <em>Lively</em></td>
    <td><b>Sadaltager</b> -- <em>Knowledgeable</em></td>
    <td><b>Sulafat</b> -- <em>Warm</em></td>
  </tr>
  </tbody>
</table>
</div>

<h3 id="voice-library" data-text="Extended Voice Library and filtering" tabindex="-1">Extended Voice Library and filtering</h3>

<p>Beyond the 30 featured studio voices in the preceding table, the <strong>Extended
Voice Library</strong> provides hundreds of additional voices across languages,
regional accents, character personas, and domains. You can browse, filter, and
audition the full Voice Library interactively in
<a href="https://aistudio.google.com/generate-speech">Google AI Studio</a>, or query it
programmatically using <code translate="no" dir="ltr">client.voices.list()</code> (<code translate="no" dir="ltr">GET /v1beta/voices</code>, using
<code translate="no" dir="ltr">google-genai</code> 2.25.0+ / <code translate="no" dir="ltr">@google/genai</code> 2.24.0+).</p>

<p><code translate="no" dir="ltr">ListVoices</code> returns your custom stored voices (ordered newest first) followed
by prebuilt catalog voices matching your filter criteria. When multiple values
are passed for a list filter, voices matching <strong>any</strong> value in that filter are
returned (<code translate="no" dir="ltr">OR</code>), while distinct filter parameters combine with <code translate="no" dir="ltr">AND</code>:</p>

<table>
<thead>
<tr>
<th style="text-align: left">Parameter</th>
<th style="text-align: left">Type</th>
<th style="text-align: left">Description</th>
</tr>
</thead>

<tbody>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">language_code</code></td>
<td style="text-align: left"><code translate="no" dir="ltr">list[str]</code></td>
<td style="text-align: left">BCP-47 language tag(s) (for example, <code translate="no" dir="ltr">[&quot;en-US&quot;, &quot;en-GB&quot;]</code>). Case-insensitive exact match.</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">region_code</code></td>
<td style="text-align: left"><code translate="no" dir="ltr">list[str]</code></td>
<td style="text-align: left">ISO 3166-1 alpha-2 or UN M.49 region code(s) (for example, <code translate="no" dir="ltr">[&quot;US&quot;, &quot;GB&quot;]</code>).</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">accent</code></td>
<td style="text-align: left"><code translate="no" dir="ltr">list[str]</code></td>
<td style="text-align: left">Regional accent descriptor(s) (for example, <code translate="no" dir="ltr">[&quot;American&quot;, &quot;British&quot;]</code>).</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">gender</code></td>
<td style="text-align: left"><code translate="no" dir="ltr">list[str]</code></td>
<td style="text-align: left">Perceived gender presentation (<code translate="no" dir="ltr">&quot;female&quot;</code>, <code translate="no" dir="ltr">&quot;male&quot;</code>, or <code translate="no" dir="ltr">&quot;neutral&quot;</code>).</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">pitch</code></td>
<td style="text-align: left"><code translate="no" dir="ltr">list[str]</code></td>
<td style="text-align: left">Vocal pitch classification (<code translate="no" dir="ltr">&quot;low&quot;</code>, <code translate="no" dir="ltr">&quot;medium&quot;</code>, or <code translate="no" dir="ltr">&quot;high&quot;</code>).</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">persona</code></td>
<td style="text-align: left"><code translate="no" dir="ltr">list[str]</code></td>
<td style="text-align: left">Vocal persona or character archetype (for example, <code translate="no" dir="ltr">[&quot;Warm, Friendly&quot;]</code>, <code translate="no" dir="ltr">[&quot;Narrator&quot;]</code>).</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">contexts</code> (<code translate="no" dir="ltr">context</code> in REST)</td>
<td style="text-align: left"><code translate="no" dir="ltr">list[str]</code></td>
<td style="text-align: left">Optimal usage domain (for example, <code translate="no" dir="ltr">[&quot;Audiobook&quot;, &quot;Conversational&quot;, &quot;News&quot;]</code>).</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">type</code> (<code translate="no" dir="ltr">type_</code> in Python)</td>
<td style="text-align: left"><code translate="no" dir="ltr">list[str]</code></td>
<td style="text-align: left">Filter by voice source: <code translate="no" dir="ltr">&quot;prebuilt&quot;</code>, <code translate="no" dir="ltr">&quot;prompted&quot;</code> (<a href="/gemini-api/docs/generate-content/voice-design">Voice design</a>), or <code translate="no" dir="ltr">&quot;replicated&quot;</code> (<a href="/gemini-api/docs/generate-content/voice-replication">Voice replication</a>).</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">search</code></td>
<td style="text-align: left"><code translate="no" dir="ltr">str</code></td>
<td style="text-align: left">Free-text substring search matched case-insensitively against both <code translate="no" dir="ltr">display_name</code> and <code translate="no" dir="ltr">description</code>.</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">page_size</code></td>
<td style="text-align: left"><code translate="no" dir="ltr">int</code></td>
<td style="text-align: left">Maximum number of voices returned per page (default <code translate="no" dir="ltr">50</code>, maximum <code translate="no" dir="ltr">1000</code>).</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">page_token</code></td>
<td style="text-align: left"><code translate="no" dir="ltr">str</code></td>
<td style="text-align: left">Token from <code translate="no" dir="ltr">response.next_page_token</code> to fetch the next page of results.</td>
</tr>
</tbody>
</table>
<div><devsite-selector data-ds-scope="code-sample">
<section><h3 id="python_2" data-text="Python" tabindex="-1">Python</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Python"><code translate="no" dir="ltr"><span class="devsite-syntax-kn">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">google</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kn">import</span> <span class="devsite-syntax-n">genai</span>

<span class="devsite-syntax-n">client</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">genai</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">Client</span><span class="devsite-syntax-p">()</span>

<span class="devsite-syntax-c1"># Filter the Voice Library by language, gender, pitch, domain context, and keyword</span>
<span class="devsite-syntax-n">response</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">client</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">voices</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">list</span><span class="devsite-syntax-p">(</span>
    <span class="devsite-syntax-n">language_code</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"en-US"</span><span class="devsite-syntax-p">,</span> <span class="devsite-syntax-s2">"en-GB"</span><span class="devsite-syntax-p">],</span>
    <span class="devsite-syntax-n">gender</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"female"</span><span class="devsite-syntax-p">],</span>
    <span class="devsite-syntax-n">pitch</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"medium"</span><span class="devsite-syntax-p">,</span> <span class="devsite-syntax-s2">"low"</span><span class="devsite-syntax-p">],</span>
    <span class="devsite-syntax-n">contexts</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"Audiobook"</span><span class="devsite-syntax-p">,</span> <span class="devsite-syntax-s2">"Conversational"</span><span class="devsite-syntax-p">],</span>
    <span class="devsite-syntax-n">type_</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"prebuilt"</span><span class="devsite-syntax-p">],</span>
    <span class="devsite-syntax-n">search</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-s2">"warm"</span><span class="devsite-syntax-p">,</span>
    <span class="devsite-syntax-n">page_size</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-mi">50</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-k">for</span> <span class="devsite-syntax-n">voice</span> <span class="devsite-syntax-ow">in</span> <span class="devsite-syntax-n">response</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">voices</span> <span class="devsite-syntax-ow">or</span> <span class="devsite-syntax-p">[]:</span>
    <span class="devsite-syntax-nb">print</span><span class="devsite-syntax-p">(</span>
        <span class="devsite-syntax-sa">f</span><span class="devsite-syntax-s2">"</span><span class="devsite-syntax-si">{</span><span class="devsite-syntax-n">voice</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-s2"> | </span><span class="devsite-syntax-si">{</span><span class="devsite-syntax-n">voice</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">display_name</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-s2"> (</span><span class="devsite-syntax-si">{</span><span class="devsite-syntax-n">voice</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">language_code</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-s2">,"</span>
        <span class="devsite-syntax-sa">f</span><span class="devsite-syntax-s2">" </span><span class="devsite-syntax-si">{</span><span class="devsite-syntax-n">voice</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">accent</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-s2">, </span><span class="devsite-syntax-si">{</span><span class="devsite-syntax-n">voice</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">gender</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-s2">, pitch=</span><span class="devsite-syntax-si">{</span><span class="devsite-syntax-n">voice</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">pitch</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-s2">):"</span>
        <span class="devsite-syntax-sa">f</span><span class="devsite-syntax-s2">" </span><span class="devsite-syntax-si">{</span><span class="devsite-syntax-n">voice</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">description</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-s2">"</span>
    <span class="devsite-syntax-p">)</span>
</code></pre></devsite-code></section>
<section><h3 id="javascript_2" data-text="JavaScript" tabindex="-1">JavaScript</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="JavaScript"><code translate="no" dir="ltr"><span class="devsite-syntax-k">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">GoogleGenAI</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"@google/genai"</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">ai</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-ow">new</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">GoogleGenAI</span><span class="devsite-syntax-p">();</span>

<span class="devsite-syntax-c1">// Filter the Voice Library by language, gender, pitch, domain context, and keyword</span>
<span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">response</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">ai</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">voices</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">list</span><span class="devsite-syntax-p">({</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nx">language_code</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"en-US"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"en-GB"</span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nx">gender</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"female"</span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nx">pitch</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"medium"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"low"</span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nx">contexts</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"Audiobook"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"Conversational"</span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nx">type</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"prebuilt"</span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nx">search</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"warm"</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nx">page_size</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">50</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-p">});</span>

<span class="devsite-syntax-k">for</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">of</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">response</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">voices</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">??</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[])</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nx">console</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">log</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-sb">`</span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">id</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb"> | </span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">display_name</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb"> (</span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">language_code</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb">, </span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">accent</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb">, </span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">gender</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb">, pitch=</span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">pitch</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb">): </span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">description</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb">`</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">);</span>
<span class="devsite-syntax-p">}</span>
</code></pre></devsite-code></section>
<section><h3 id="rest_2" data-text="REST" tabindex="-1">REST</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Bash"><code translate="no" dir="ltr">curl<span class="devsite-syntax-w"> </span>-G<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"https://generativelanguage.googleapis.com/v1beta/voices"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-H<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"x-goog-api-key: </span><span class="devsite-syntax-nv">$GEMINI_API_KEY</span><span class="devsite-syntax-s2">"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>--data-urlencode<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"language_code=en-US"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>--data-urlencode<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"language_code=en-GB"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>--data-urlencode<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"gender=female"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>--data-urlencode<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pitch=medium"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>--data-urlencode<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"context=Audiobook"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>--data-urlencode<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"type=prebuilt"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>--data-urlencode<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"search=warm"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>--data-urlencode<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"page_size=50"</span>
</code></pre></devsite-code></section>
</devsite-selector></div>
<h2 id="languages" data-text="Supported languages" tabindex="-1">Supported languages</h2>

<p>The TTS models detect the input language automatically.
<a href="/gemini-api/docs/models/gemini-3.8-flash-tts">Gemini 3.8 Flash TTS</a>
(<code translate="no" dir="ltr">gemini-3.8-flash-tts</code>) supports <strong>over 130 languages</strong>, and
<a href="/gemini-api/docs/models/gemini-3.8-flash-lite-tts">Gemini 3.8 Flash-Lite TTS</a>
(<code translate="no" dir="ltr">gemini-3.8-flash-lite-tts</code>) supports <strong>over 100 languages</strong>:</p>

<table>
<thead>
<tr>
<th style="text-align: left">Language</th>
<th style="text-align: left">Gemini 3.8 Flash TTS</th>
<th style="text-align: left">Gemini 3.8 Flash-Lite TTS</th>
</tr>
</thead>

<tbody>
<tr>
<td style="text-align: left">Acehnese (Arab script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Afrikaans</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Akan</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Amharic</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Armenian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Assamese</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Awadhi</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Balinese</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Bangla</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Banjar (Arab script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Banjar (Latn script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Bashkir</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Basque</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Belarusian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Bemba</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Bhojpuri</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Bosnian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Buginese</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Bulgarian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Burmese</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Cantonese</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Catalan</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Cebuano</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Central Kurdish</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Chhattisgarhi</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Chinese (Hans script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Chinese (Hant script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Crimean Tatar</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Croatian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Czech</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Danish</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Dutch</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Dyula</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Dzongkha</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Egyptian Arabic</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">English</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Estonian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Filipino</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Finnish</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">French</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Galician</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Ganda</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Georgian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">German</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Greek</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Guarani</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Gujarati</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Haitian Creole</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Halh Mongolian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Hausa</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Hebrew</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Hindi</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Hungarian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Icelandic</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Igbo</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Iloko</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Indonesian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Iranian Persian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Italian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Japanese</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Javanese</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Kabyle</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Kamba</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Kannada</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Kashmiri (Arab script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Kashmiri (Deva script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Kazakh</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Khmer</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Kikuyu</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Kinyarwanda</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Kongo</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Korean</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Kyrgyz</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Lao</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Latgalian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Lingala</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Lithuanian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Luxembourgish</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Macedonian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Magahi</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Maithili</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Malayalam</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Maltese</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Manipuri</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Marathi</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Minangkabau (Arab script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Minangkabau (Latn script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Mizo</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Nepali (individual language)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Nigerian Fulfulde</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">North Azerbaijani</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Northern Sotho</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Northern Uzbek</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Norwegian Bokmål</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Norwegian Nynorsk</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Nyanja</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Occitan</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Odia (individual language)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Pangasinan</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Persian (Afghanistan)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Polish</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Portuguese</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Punjabi</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Romanian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Russian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Santali</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Serbian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Sindhi</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Sinhala</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Slovak</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Slovenian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Somali</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">South Azerbaijani</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Southern Pashto</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Southern Sotho</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Spanish</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Standard Arabic (Arab script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Standard Arabic (Latn script)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Standard Latvian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Standard Malay</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Swahili (individual language)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Swati</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Swedish</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Tajik</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Tamil</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Telugu</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Thai</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Tigrinya</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Tosk Albanian</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Turkish</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left">Uyghur</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left">Vietnamese</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
</tbody>
</table>

<h2 id="supported-models" data-text="Supported models" tabindex="-1">Supported models</h2>

<table>
<thead>
<tr>
<th style="text-align: left">Model</th>
<th style="text-align: left">Single speaker</th>
<th style="text-align: left">Multi-speaker</th>
<th style="text-align: left">Voice design</th>
<th style="text-align: left">Voice replication</th>
</tr>
</thead>

<tbody>
<tr>
<td style="text-align: left"><a href="/gemini-api/docs/models/gemini-3.8-flash-tts">Gemini 3.8 Flash TTS</a> (<code translate="no" dir="ltr">gemini-3.8-flash-tts</code>)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left"><a href="/gemini-api/docs/models/gemini-3.8-flash-lite-tts">Gemini 3.8 Flash-Lite TTS</a> (<code translate="no" dir="ltr">gemini-3.8-flash-lite-tts</code>)</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
</tr>
<tr>
<td style="text-align: left"><a href="/gemini-api/docs/models/gemini-3.1-flash-tts-preview">Gemini 3.1 Flash TTS Preview</a></td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
<td style="text-align: left">—</td>
</tr>
<tr>
<td style="text-align: left"><a href="/gemini-api/docs/models/gemini-2.5-pro-preview-tts">Gemini 2.5 Pro Preview TTS</a></td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">✔️</td>
<td style="text-align: left">—</td>
<td style="text-align: left">—</td>
</tr>
</tbody>
</table>

<h3 id="when-to-use-which-model" data-text="When to use which model" tabindex="-1">When to use which model</h3>

<p>Both Gemini 3.8 TTS models share the exact same API schema and prompting format,
allowing you to switch between them with a single parameter change:</p>

<ul>
<li><strong>Use <a href="/gemini-api/docs/models/gemini-3.8-flash-tts">Gemini 3.8 Flash TTS</a>
(<code translate="no" dir="ltr">gemini-3.8-flash-tts</code>)</strong> when maximum acoustic fidelity, nuanced acting,
and expressive control are top priority. It is ideal for studio-grade
creative work, complex multi-speaker dialogue, heavy vocal-burst tags,
difficult pronunciations, regional or minority dialects, and long-form
narrations requiring rock-solid voice and room-tone stability.</li>
<li><strong>Use <a href="/gemini-api/docs/models/gemini-3.8-flash-lite-tts">Gemini 3.8 Flash-Lite TTS</a>
(<code translate="no" dir="ltr">gemini-3.8-flash-lite-tts</code>)</strong> as your fast, cost-efficient workhorse
replacement for <code translate="no" dir="ltr">gemini-3.1-flash-tts-preview</code>. It is optimized for
high-volume bulk production, conversational voice agent cascades, read-aloud
features, reliable voice replication, and everyday single-speaker speech
across major languages.</li>
</ul>

<h3 id="migration" data-text="Migration guide" tabindex="-1">Migration guide</h3>

<p>When upgrading from earlier preview models (<code translate="no" dir="ltr">gemini-3.1-flash-tts-preview</code> or
<code translate="no" dir="ltr">gemini-2.5-pro-preview-tts</code>) to Gemini 3.8 TTS (<code translate="no" dir="ltr">gemini-3.8-flash-tts</code> or
<code translate="no" dir="ltr">gemini-3.8-flash-lite-tts</code>), review these five key changes:</p>

<ol>
<li><strong>Separate style from transcript:</strong> Move sustained acting, tone, prosody, and
pacing instructions (such as <code translate="no" dir="ltr">&quot;whispering&quot;</code>, <code translate="no" dir="ltr">&quot;out of breath&quot;</code>, or
<code translate="no" dir="ltr">&quot;speaking slowly&quot;</code>) out of plain text and into <code translate="no" dir="ltr">speech_metadata.style</code>.
Keep <code translate="no" dir="ltr">text</code> strictly as the verbatim transcript plus inline vocal tags.</li>
<li><strong>Design personas upfront with Voice design:</strong> Replace multi-paragraph
<code translate="no" dir="ltr">&quot;Audio Profile&quot;</code> or <code translate="no" dir="ltr">&quot;Director&#39;s Notes&quot;</code> blocks with a custom voice created
in <a href="/gemini-api/docs/generate-content/voice-design">Voice design</a>, then
carry that <code translate="no" dir="ltr">voice_...</code> ID through your TTS requests with minimal or empty
<code translate="no" dir="ltr">style</code> strings.</li>
<li><strong>Use structured dialogue turns:</strong> For multi-speaker dialogue, pass one
<code translate="no" dir="ltr">part</code> per speaker turn with <code translate="no" dir="ltr">speech_metadata.speaker</code> instead of embedding
<code translate="no" dir="ltr">Speaker: ...</code> prefixes inside a single text block.</li>
<li><strong>Use angle brackets for inline vocal tags:</strong> Use angle brackets (<code translate="no" dir="ltr">&lt;laugh&gt;</code>,
<code translate="no" dir="ltr">&lt;sigh&gt;</code>, <code translate="no" dir="ltr">&lt;cough&gt;</code>, <code translate="no" dir="ltr">&lt;breath&gt;</code>, <code translate="no" dir="ltr">&lt;short pause&gt;</code>) for point-in-time human
vocalizations and pauses. Avoid non-vocal sound-effect tags (such as
applause or thuds).</li>
<li><strong>Account for default WAV (<code translate="no" dir="ltr">AUDIO_WAV</code>) output on unary requests:</strong> Unlike
<code translate="no" dir="ltr">gemini-3.1-flash-tts-preview</code> (which returned headerless raw PCM
<code translate="no" dir="ltr">AUDIO_L16</code> by default), Gemini 3.8 TTS models return complete <strong>WAV
(<code translate="no" dir="ltr">AUDIO_WAV</code>)</strong> audio with a RIFF header (24 kHz, mono, 16-bit PCM) on
unary requests:
<ul>
<li>If your code previously wrapped raw PCM bytes in a WAV header (for
example, using Python&#39;s <code translate="no" dir="ltr">wave</code> module or Node&#39;s <code translate="no" dir="ltr">wav</code> package), remove
the manual header wrapper and write the decoded audio bytes directly to
a <code translate="no" dir="ltr">.wav</code> file.</li>
<li>If your existing pipeline requires headerless raw PCM, mu-law, or A-law
audio, explicitly set <code translate="no" dir="ltr">response_format.audio.mime_type</code> to
<code translate="no" dir="ltr">&quot;AUDIO_L16&quot;</code>, <code translate="no" dir="ltr">&quot;AUDIO_MULAW&quot;</code>, or <code translate="no" dir="ltr">&quot;AUDIO_ALAW&quot;</code> (for example,
<code translate="no" dir="ltr">{&quot;response_format&quot;: {&quot;audio&quot;: {&quot;mime_type&quot;: &quot;AUDIO_L16&quot;}}}</code> in
<code translate="no" dir="ltr">generateContent</code>, or
<code translate="no" dir="ltr">{&quot;response_format&quot;: {&quot;type&quot;: &quot;audio&quot;, &quot;mime_type&quot;: &quot;audio/l16&quot;}}</code> in
the Interactions API). See
<a href="/gemini-api/docs/generate-content/speech-generation#audio-output-formats">Audio output formats</a>.</li>
</ul></li>
</ol>

<h2 id="prompting-guide" data-text="Prompting guide" tabindex="-1">Prompting guide</h2>

<p>Gemini 3.8 TTS models treat input text strictly as a <strong>verbatim transcript</strong>.
Unlike earlier preview models where stage directions were embedded in plain text,
Gemini 3.8 TTS separates sustained turn-level directions (<code translate="no" dir="ltr">speech_metadata</code>)
from point-in-time inline vocal tags.</p>

<h3 id="style-vs-inline-tags" data-text="Style field versus inline tags" tabindex="-1">Style field versus inline tags</h3>

<p>Split your performance instructions by scope:</p>

<ul>
<li><strong>Turn-level delivery (<code translate="no" dir="ltr">speech_metadata.style</code>):</strong> Put sustained delivery
attributes—such as emotion, prosody, overall pace, or delivery style (like
<code translate="no" dir="ltr">&quot;whispering&quot;</code>, <code translate="no" dir="ltr">&quot;out of breath&quot;</code>, <code translate="no" dir="ltr">&quot;muttering&quot;</code>, or <code translate="no" dir="ltr">&quot;sarcastic&quot;</code>)—into the
<code translate="no" dir="ltr">style</code> field of <code translate="no" dir="ltr">speech_metadata</code>. To create a stable character and
performance across turns, design the persona upfront in
<a href="/gemini-api/docs/generate-content/voice-design">Voice design</a> and use
<code translate="no" dir="ltr">style</code> only for optional turn-level tweaks.</li>
<li><strong>Point-in-time events (inline tags):</strong> Put momentary non-speech vocal
bursts, breaths, or pauses inline inside the transcript using angle brackets
(<code translate="no" dir="ltr">&lt;cough&gt;</code>, <code translate="no" dir="ltr">&lt;breath&gt;</code>, <code translate="no" dir="ltr">&lt;sigh&gt;</code>, <code translate="no" dir="ltr">&lt;short pause&gt;</code>). Use angle brackets
(<code translate="no" dir="ltr">&lt;...&gt;</code>) for highest audio quality, and stick to human vocalizations rather
than non-vocal sound effects.</li>
</ul>

<table>
<thead>
<tr>
<th style="text-align: left">Scope</th>
<th style="text-align: left">Where to place</th>
<th style="text-align: left">Examples</th>
</tr>
</thead>

<tbody>
<tr>
<td style="text-align: left"><strong>Turn-level</strong> (sustained across the turn)</td>
<td style="text-align: left"><code translate="no" dir="ltr">speech_metadata.style</code></td>
<td style="text-align: left"><code translate="no" dir="ltr">&quot;angry tone&quot;</code>, <code translate="no" dir="ltr">&quot;speaking rapidly&quot;</code>, <code translate="no" dir="ltr">&quot;out of breath&quot;</code>, <code translate="no" dir="ltr">&quot;whispers&quot;</code>, <code translate="no" dir="ltr">&quot;sarcastic&quot;</code></td>
</tr>
<tr>
<td style="text-align: left"><strong>Point-in-time</strong> (occurs at a specific word)</td>
<td style="text-align: left">Inline in <code translate="no" dir="ltr">text</code> (<code translate="no" dir="ltr">&lt;...&gt;</code>)</td>
<td style="text-align: left"><code translate="no" dir="ltr">&quot;&lt;cough&gt; Thank you all for coming tonight! &lt;throat-clearing&gt; As I was saying...&quot;</code></td>
</tr>
</tbody>
</table>

<h3 id="pacing-and-pauses" data-text="Pacing and pauses" tabindex="-1">Pacing and pauses</h3>

<p>You can control rhythm and silence at three levels of granularity:</p>

<ul>
<li><strong>Punctuation and ellipses:</strong> Use commas, dashes (<code translate="no" dir="ltr">--</code>), and ellipses (<code translate="no" dir="ltr">...</code>)
for natural conversational hesitation.</li>
<li><strong>Inline pause tags:</strong> Insert <code translate="no" dir="ltr">&lt;short pause&gt;</code> or <code translate="no" dir="ltr">&lt;long pause&gt;</code> at exact
points in the script where a speaker should pause:
<code translate="no" dir="ltr">text
Hold on, let me think... &lt;short pause&gt; Alright, I&#39;ve got it.</code></li>
<li><strong>Turn-level pace:</strong> Set <code translate="no" dir="ltr">&quot;style&quot;: &quot;speaking rapidly&quot;</code> or
<code translate="no" dir="ltr">&quot;style&quot;: &quot;speaking slowly&quot;</code> in <code translate="no" dir="ltr">speech_metadata</code> to control the speaking
rate across the whole turn.</li>
</ul>

<h3 id="prosody-and-pitch" data-text="Prosody and pitch" tabindex="-1">Prosody and pitch</h3>

<p>Use <strong><code translate="no" dir="ltr">speech_metadata.style</code></strong> to control prosody, pitch, and inflection across
a turn (for example, <code translate="no" dir="ltr">&quot;style&quot;: &quot;high pitch, cheerful and excited inflection&quot;</code> or
<code translate="no" dir="ltr">&quot;style&quot;: &quot;monotone and flat&quot;</code>). If the emotion or prosody shifts mid-dialogue,
split the script into separate turns with distinct <code translate="no" dir="ltr">style</code> values for each turn.</p>

<h3 id="emphasis" data-text="Emphasis" tabindex="-1">Emphasis</h3>

<p>Capitalize specific words in the transcript, combined with punctuation and inline
vocal tags, to place natural vocal stress on key words:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Text only"><code translate="no" dir="ltr">This is a VERY important point!
It was a VERY long day &lt;sigh&gt; ... nobody listens anymore.
</code></pre></devsite-code>
<h3 id="vocal-bursts" data-text="Vocal bursts and non-speech sounds" tabindex="-1">Vocal bursts and non-speech sounds</h3>

<p>Place non-speech human vocalizations inline using angle brackets (<code translate="no" dir="ltr">&lt;...&gt;</code>) at
the exact point where the sound should occur. Recommended vocal tags include:</p>

<div>
<table>
  <colgroup>
    <col class="paid-tier">
    <col>
    <col class="paid-tier">
    <col>
  </colgroup>
  <tbody>
  <tr>
    <td><code translate="no" dir="ltr">&lt;argh&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;breath&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;heavy breath&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;exhales&gt;</code></td>
  </tr>
  <tr>
    <td><code translate="no" dir="ltr">&lt;cackle&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;cheer&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;chuckle&gt;</code> / <code translate="no" dir="ltr">&lt;chuckles&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;cough&gt;</code></td>
  </tr>
  <tr>
    <td><code translate="no" dir="ltr">&lt;cry&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;gasp&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;giggle&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;groan&gt;</code></td>
  </tr>
  <tr>
    <td><code translate="no" dir="ltr">&lt;growl&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;grunt&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;grr&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;hiss&gt;</code></td>
  </tr>
  <tr>
    <td><code translate="no" dir="ltr">&lt;laugh&gt;</code> / <code translate="no" dir="ltr">&lt;laughter&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;moan&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;pant&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;pff&gt;</code> / <code translate="no" dir="ltr">&lt;phew&gt;</code></td>
  </tr>
  <tr>
    <td><code translate="no" dir="ltr">&lt;scream&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;shout&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;shriek&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;sigh&gt;</code> / <code translate="no" dir="ltr">&lt;sighs&gt;</code></td>
  </tr>
  <tr>
    <td><code translate="no" dir="ltr">&lt;sneeze&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;snicker&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;snort&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;sob&gt;</code></td>
  </tr>
  <tr>
    <td><code translate="no" dir="ltr">&lt;throat-clearing&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;tsk&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;whimper&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;whispers&gt;</code> / <code translate="no" dir="ltr">&lt;whispering&gt;</code></td>
  </tr>
  <tr>
    <td><code translate="no" dir="ltr">&lt;yawn&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;short pause&gt;</code></td>
    <td><code translate="no" dir="ltr">&lt;long pause&gt;</code></td>
    <td></td>
  </tr>
  </tbody>
</table>
</div>
<aside class="note"><strong>Note:</strong><span> If your transcript is in a non-English language, continue to use English
inline tags for best results.</span></aside>
<h3 id="backchannels" data-text="Backchannels and overlapping speech" tabindex="-1">Backchannels and overlapping speech</h3>

<p>In multi-speaker dialogue, wrap listener reactions in pipe characters
(<code translate="no" dir="ltr">|reaction|</code>) inside a speaker&#39;s turn to create natural backchannels or
overlapping speech without breaking into a separate turn per reaction.</p>

<ul>
<li><strong>Short backchannel exchanges:</strong> Layer brief listener reactions (<code translate="no" dir="ltr">|oh hmm|</code>,
<code translate="no" dir="ltr">|oh really?|</code>, <code translate="no" dir="ltr">|absolutely|</code>) inside the active speaker&#39;s turn:
<ul>
<li><strong>Turn 1 (Speaker A):</strong> <code translate="no" dir="ltr">&quot;So the launch is Thursday |oh hmm| Are we actually ready?&quot;</code></li>
<li><strong>Turn 2 (Speaker B):</strong> <code translate="no" dir="ltr">&quot;Ready enough |oh really?| The last blocker cleared this morning.&quot;</code></li>
<li><strong>Turn 3 (Speaker A):</strong> <code translate="no" dir="ltr">&quot;Then let&#39;s ship it |absolutely| and watch the dashboards.&quot;</code></li>
</ul></li>
<li><strong>Overlapping and interleaved speech:</strong> Use multiple pipe segments to
simulate simultaneous or interleaved speech between two speakers (works best
with <code translate="no" dir="ltr">gemini-3.8-flash-tts</code>):
<ul>
<li><strong>Simultaneous countdown/chorus:</strong> <code translate="no" dir="ltr">&quot;Let&#39;s surprise him on three |ok| ready?&quot;</code> followed by <code translate="no" dir="ltr">&quot;one. two. three. |happy| happy |birthday| birthday!&quot;</code></li>
<li><strong>Full speaker overlap:</strong> <code translate="no" dir="ltr">&quot;Hello |oh| there |my| it |goodness| must |gracious| be |would| almost |you| time |look| for |at that| dinner&quot;</code></li>
</ul></li>
</ul>

<h3 id="consistency-and-what-to-avoid" data-text="Consistency across generations and what to avoid" tabindex="-1">Consistency across generations and what to avoid</h3>

<p>Follow these guidelines to keep vocal identity stable across turns:</p>

<ul>
<li><strong>Design personas upfront in Voice design instead of long style blocks:</strong>
Long-form <code translate="no" dir="ltr">&quot;Audio Profile&quot;</code> paragraphs and multi-bullet <code translate="no" dir="ltr">&quot;Director&#39;s Notes&quot;</code>
carried over from earlier models are the most common cause of voice drift.
Use that same creative intuition upfront in
<a href="/gemini-api/docs/generate-content/voice-design">Voice design</a> to generate a
persistent custom <code translate="no" dir="ltr">voice_...</code> persona, then carry that voice ID through your
TTS calls.</li>
<li><strong>Rely on the voice reference for stability (omit meta-instructions):</strong>
Gemini 3.8 TTS models are trained to anchor on the audio reference first.
Do not include instructions telling the model to hold the voice steady (such
as <code translate="no" dir="ltr">&quot;do not switch speaker identity&quot;</code> or <code translate="no" dir="ltr">&quot;maintain identical timbre&quot;</code>)—extra
prompt text increases drift. Drop unnecessary style instructions and let the
model vary naturally around the stable point provided by the voice reference.</li>
<li><strong>Do not try to change immutable speaker traits in <code translate="no" dir="ltr">style</code>:</strong> Avoid putting
age, gender, names, or permanent accent changes in <code translate="no" dir="ltr">speech_metadata.style</code>.
Instead, pick a regional voice from the Extended Voice Library or create one
with <a href="/gemini-api/docs/generate-content/voice-design">Voice design</a>.</li>
</ul>

<h3 id="recommended-workflow" data-text="Recommended workflow" tabindex="-1">Recommended workflow</h3>

<ol>
<li><strong>Build the character once:</strong> Create your character in
<a href="/gemini-api/docs/generate-content/voice-design">Voice design</a> or select a
regional voice from the Extended Voice Library that matches your target
language and persona.</li>
<li><strong>Write natural spoken transcripts with disfluencies:</strong> For maximum
naturalness, write the <code translate="no" dir="ltr">text</code> as a real spoken transcript—including natural
conversational disfluencies and hesitations (for example,
<code translate="no" dir="ltr">&quot;Oh uh yeah I think... hm, so that&#39;s interesting&quot;</code>).</li>
<li><strong>Test plain TTS first:</strong> Synthesize your transcript with an empty <code translate="no" dir="ltr">style</code>
field first—most requests need no <code translate="no" dir="ltr">style</code> instruction at all.</li>
<li><strong>Add short <code translate="no" dir="ltr">style</code> prompts only for tweaks:</strong> Add a concise <code translate="no" dir="ltr">style</code> string
(such as <code translate="no" dir="ltr">&quot;casual, friendly&quot;</code> or <code translate="no" dir="ltr">&quot;muttering, then reassuring&quot;</code>) only for
turns that need a specific delivery adjustment, and reuse that exact short
string across turns when you want a consistent baseline.</li>
</ol>

<h3 id="multi-turn-and-voice-agents" data-text="Multi-turn dialogue and voice agents" tabindex="-1">Multi-turn dialogue and voice agents</h3>

<p>When building real-time conversational voice agents or multi-turn applications:</p>

<ul>
<li>Make <strong>one TTS call per turn</strong> as LLM text chunks arrive.</li>
<li>Let the configured <code translate="no" dir="ltr">voice</code> (prebuilt, designed <code translate="no" dir="ltr">voice_...</code>, or replicated
<code translate="no" dir="ltr">voice_...</code> / <code translate="no" dir="ltr">voicekey_...</code>) carry the speaker&#39;s identity across turns—never
re-send a long character persona on each turn.</li>
<li>Leave the per-turn <code translate="no" dir="ltr">style</code> field empty, or send one short constant string
(such as <code translate="no" dir="ltr">&quot;casual, friendly&quot;</code>) for the whole conversation.</li>
<li>Split long agent responses into shorter turns rather than reaching for
stronger style prompts.</li>
</ul>

<h2 id="streaming" data-text="Streaming speech generation" tabindex="-1">Streaming speech generation</h2>

<p>You can stream generated audio as it is being synthesized by the model. Unlike
unary requests (which return a complete WAV file with a RIFF header),
<strong>streaming requests return headerless raw 16-bit signed little-endian linear
PCM (<code translate="no" dir="ltr">AUDIO_L16</code> / <code translate="no" dir="ltr">audio/L16;codec=pcm;rate=24000</code>, 24 kHz, mono) chunks by
default</strong> so audio chunks can be played or concatenated continuously without
container headers:</p>
<div><devsite-selector data-ds-scope="code-sample">
<section><h3 id="python_3" data-text="Python" tabindex="-1">Python</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Python"><code translate="no" dir="ltr"><span class="devsite-syntax-kn">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">google</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kn">import</span> <span class="devsite-syntax-n">genai</span>

<span class="devsite-syntax-n">client</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">genai</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">Client</span><span class="devsite-syntax-p">()</span>

<span class="devsite-syntax-n">response_stream</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">client</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">models</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">generate_content_stream</span><span class="devsite-syntax-p">(</span>
    <span class="devsite-syntax-n">model</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-s2">"gemini-3.8-flash-tts"</span><span class="devsite-syntax-p">,</span>
    <span class="devsite-syntax-n">contents</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">[{</span>
        <span class="devsite-syntax-s2">"role"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"user"</span><span class="devsite-syntax-p">,</span>
        <span class="devsite-syntax-s2">"parts"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">[{</span>
            <span class="devsite-syntax-s2">"text"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Have a wonderful day!"</span><span class="devsite-syntax-p">,</span>
            <span class="devsite-syntax-s2">"speech_metadata"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span><span class="devsite-syntax-s2">"style"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"cheerful and friendly"</span><span class="devsite-syntax-p">},</span>
        <span class="devsite-syntax-p">}],</span>
    <span class="devsite-syntax-p">}],</span>
    <span class="devsite-syntax-n">config</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">{</span>
        <span class="devsite-syntax-s2">"response_modalities"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"AUDIO"</span><span class="devsite-syntax-p">],</span>
        <span class="devsite-syntax-s2">"speech_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
            <span class="devsite-syntax-s2">"voice_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span><span class="devsite-syntax-s2">"voice"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Kore"</span><span class="devsite-syntax-p">}</span>
        <span class="devsite-syntax-p">},</span>
    <span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-k">for</span> <span class="devsite-syntax-n">chunk</span> <span class="devsite-syntax-ow">in</span> <span class="devsite-syntax-n">response_stream</span><span class="devsite-syntax-p">:</span>
    <span class="devsite-syntax-k">try</span><span class="devsite-syntax-p">:</span>
        <span class="devsite-syntax-n">data</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">chunk</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">candidates</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">content</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">parts</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">inline_data</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">data</span>
        <span class="devsite-syntax-c1"># data contains raw PCM bytes (24kHz, 1-channel, 16-bit)</span>
    <span class="devsite-syntax-k">except</span> <span class="devsite-syntax-p">(</span><span class="devsite-syntax-ne">IndexError</span><span class="devsite-syntax-p">,</span> <span class="devsite-syntax-ne">AttributeError</span><span class="devsite-syntax-p">):</span>
        <span class="devsite-syntax-k">pass</span>
</code></pre></devsite-code></section>
<section><h3 id="javascript_3" data-text="JavaScript" tabindex="-1">JavaScript</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="JavaScript"><code translate="no" dir="ltr"><span class="devsite-syntax-k">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-nx">GoogleGenAI</span><span class="devsite-syntax-p">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'@google/genai'</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-k">async</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kd">function</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">main</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">ai</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-ow">new</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">GoogleGenAI</span><span class="devsite-syntax-p">({});</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">responseStream</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">ai</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">models</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">generateContentStream</span><span class="devsite-syntax-p">({</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">model</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'gemini-3.8-flash-tts'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">contents</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[{</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">role</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'user'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">parts</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[{</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">text</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Have a wonderful day!'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">speechMetadata</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">style</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'cheerful and friendly'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-p">}],</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-p">}],</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">config</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">responseModalities</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s1">'AUDIO'</span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">speechConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">voiceConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Kore'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-p">});</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-k">for</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">chunk</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">of</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">responseStream</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">chunk</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">candidates</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.[</span><span class="devsite-syntax-mf">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">content</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">parts</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.[</span><span class="devsite-syntax-mf">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">inlineData</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-k">if</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">audioBuffer</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">Buffer</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'base64'</span><span class="devsite-syntax-p">);</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-c1">// Process the audio buffer</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-p">}</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-p">}</span>
<span class="devsite-syntax-p">}</span>
<span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">main</span><span class="devsite-syntax-p">();</span>
</code></pre></devsite-code></section>
<section><h3 id="rest_3" data-text="REST" tabindex="-1">REST</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Bash"><code translate="no" dir="ltr">curl<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:streamGenerateContent"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-H<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"x-goog-api-key: </span><span class="devsite-syntax-nv">$GEMINI_API_KEY</span><span class="devsite-syntax-s2">"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-X<span class="devsite-syntax-w"> </span>POST<span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-H<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"Content-Type: application/json"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-d<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'{</span>
<span class="devsite-syntax-s1">        "contents": [{</span>
<span class="devsite-syntax-s1">          "role": "user",</span>
<span class="devsite-syntax-s1">          "parts": [{</span>
<span class="devsite-syntax-s1">            "text": "Have a wonderful day!",</span>
<span class="devsite-syntax-s1">            "speech_metadata": {</span>
<span class="devsite-syntax-s1">              "style": "cheerful and friendly"</span>
<span class="devsite-syntax-s1">            }</span>
<span class="devsite-syntax-s1">          }]</span>
<span class="devsite-syntax-s1">        }],</span>
<span class="devsite-syntax-s1">        "generationConfig": {</span>
<span class="devsite-syntax-s1">          "responseModalities": ["AUDIO"],</span>
<span class="devsite-syntax-s1">          "speechConfig": {</span>
<span class="devsite-syntax-s1">            "voiceConfig": {</span>
<span class="devsite-syntax-s1">              "voice": "Kore"</span>
<span class="devsite-syntax-s1">            }</span>
<span class="devsite-syntax-s1">          }</span>
<span class="devsite-syntax-s1">        }</span>
<span class="devsite-syntax-s1">    }'</span>
</code></pre></devsite-code></section>
</devsite-selector></div>
<h2 id="audio-output-formats" data-text="Audio output formats" tabindex="-1">Audio output formats</h2>

<p>Gemini 3.8 TTS models use different default audio formats depending on whether
the request is unary or streaming:</p>

<ul>
<li><strong>Unary requests (<code translate="no" dir="ltr">models.generate_content</code>):</strong> Return complete <strong>WAV
(<code translate="no" dir="ltr">AUDIO_WAV</code>)</strong> audio with a RIFF header (24 kHz, mono, 16-bit signed
little-endian PCM). You can write the decoded audio bytes directly to a
<code translate="no" dir="ltr">.wav</code> file without manually adding a WAV container.</li>
<li><strong>Streaming requests (<code translate="no" dir="ltr">models.generate_content_stream</code> / <code translate="no" dir="ltr">streamGenerateContent</code>):</strong>
Return <strong>headerless raw Linear PCM (<code translate="no" dir="ltr">AUDIO_L16</code>)</strong> chunks (24 kHz, mono,
16-bit signed little-endian PCM) by default so chunks can be streamed or
concatenated continuously without container headers on each chunk.</li>
</ul>

<p>You can override the output audio encoding and sample rate using
<code translate="no" dir="ltr">generationConfig.responseFormat.audio</code>:</p>

<table>
<thead>
<tr>
<th style="text-align: left"><code translate="no" dir="ltr">mimeType</code> value</th>
<th style="text-align: left">Format</th>
<th style="text-align: left">Description</th>
</tr>
</thead>

<tbody>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">&quot;AUDIO_WAV&quot;</code> <em>(unary default)</em></td>
<td style="text-align: left">WAV (<code translate="no" dir="ltr">audio/wav</code>)</td>
<td style="text-align: left">Complete WAV file with a RIFF header (24 kHz, mono, 16-bit PCM).</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">&quot;AUDIO_L16&quot;</code> <em>(streaming default)</em></td>
<td style="text-align: left">Linear PCM (<code translate="no" dir="ltr">audio/l16</code>)</td>
<td style="text-align: left">Headerless raw 16-bit signed little-endian linear PCM. Best for streaming, custom audio pipelines, or concatenating multi-turn clips.</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">&quot;AUDIO_MULAW&quot;</code></td>
<td style="text-align: left">μ-law (<code translate="no" dir="ltr">audio/basic</code> / <code translate="no" dir="ltr">audio/mulaw</code>)</td>
<td style="text-align: left">G.711 μ-law companded audio. Commonly used in North American and Japanese telephony (8 kHz).</td>
</tr>
<tr>
<td style="text-align: left"><code translate="no" dir="ltr">&quot;AUDIO_ALAW&quot;</code></td>
<td style="text-align: left">A-law (<code translate="no" dir="ltr">audio/alaw</code>)</td>
<td style="text-align: left">G.711 A-law companded audio. Commonly used in European and international telephony (8 kHz).</td>
</tr>
</tbody>
</table>

<p>You can also optionally specify <code translate="no" dir="ltr">sampleRate</code> (for example, <code translate="no" dir="ltr">24000</code>, <code translate="no" dir="ltr">16000</code>, or
<code translate="no" dir="ltr">8000</code> Hz; defaults to <code translate="no" dir="ltr">24000</code> Hz).</p>

<p>The following example requests headerless raw 16-bit PCM (<code translate="no" dir="ltr">AUDIO_L16</code>) at
24 kHz:</p>
<div><devsite-selector data-ds-scope="code-sample">
<section><h3 id="python_4" data-text="Python" tabindex="-1">Python</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Python"><code translate="no" dir="ltr"><span class="devsite-syntax-kn">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">google</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kn">import</span> <span class="devsite-syntax-n">genai</span>

<span class="devsite-syntax-n">client</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">genai</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">Client</span><span class="devsite-syntax-p">()</span>

<span class="devsite-syntax-n">response</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">client</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">models</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">generate_content</span><span class="devsite-syntax-p">(</span>
    <span class="devsite-syntax-n">model</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-s2">"gemini-3.8-flash-tts"</span><span class="devsite-syntax-p">,</span>
    <span class="devsite-syntax-n">contents</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">[{</span>
        <span class="devsite-syntax-s2">"role"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"user"</span><span class="devsite-syntax-p">,</span>
        <span class="devsite-syntax-s2">"parts"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">[{</span>
            <span class="devsite-syntax-s2">"text"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Have a wonderful day!"</span><span class="devsite-syntax-p">,</span>
            <span class="devsite-syntax-s2">"speech_metadata"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span><span class="devsite-syntax-s2">"style"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"cheerful and friendly"</span><span class="devsite-syntax-p">},</span>
        <span class="devsite-syntax-p">}],</span>
    <span class="devsite-syntax-p">}],</span>
    <span class="devsite-syntax-n">config</span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-p">{</span>
        <span class="devsite-syntax-s2">"response_modalities"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">[</span><span class="devsite-syntax-s2">"AUDIO"</span><span class="devsite-syntax-p">],</span>
        <span class="devsite-syntax-s2">"response_format"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
            <span class="devsite-syntax-s2">"audio"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
                <span class="devsite-syntax-s2">"mime_type"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"AUDIO_L16"</span><span class="devsite-syntax-p">,</span>
                <span class="devsite-syntax-s2">"sample_rate"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-mi">24000</span><span class="devsite-syntax-p">,</span>
            <span class="devsite-syntax-p">}</span>
        <span class="devsite-syntax-p">},</span>
        <span class="devsite-syntax-s2">"speech_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span>
            <span class="devsite-syntax-s2">"voice_config"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-p">{</span><span class="devsite-syntax-s2">"voice"</span><span class="devsite-syntax-p">:</span> <span class="devsite-syntax-s2">"Kore"</span><span class="devsite-syntax-p">}</span>
        <span class="devsite-syntax-p">},</span>
    <span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-n">data</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">response</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">candidates</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">content</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">parts</span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">inline_data</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">data</span>
<span class="devsite-syntax-k">with</span> <span class="devsite-syntax-nb">open</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"out.pcm"</span><span class="devsite-syntax-p">,</span> <span class="devsite-syntax-s2">"wb"</span><span class="devsite-syntax-p">)</span> <span class="devsite-syntax-k">as</span> <span class="devsite-syntax-n">f</span><span class="devsite-syntax-p">:</span>
    <span class="devsite-syntax-n">f</span><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">write</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">data</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code></section>
<section><h3 id="javascript_4" data-text="JavaScript" tabindex="-1">JavaScript</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="JavaScript"><code translate="no" dir="ltr"><span class="devsite-syntax-k">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-nx">GoogleGenAI</span><span class="devsite-syntax-p">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'@google/genai'</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-k">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">fs</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'node:fs'</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-k">async</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kd">function</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">main</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">ai</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-ow">new</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">GoogleGenAI</span><span class="devsite-syntax-p">({});</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">response</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">ai</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">models</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">generateContent</span><span class="devsite-syntax-p">({</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">model</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'gemini-3.8-flash-tts'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">contents</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[{</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">role</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'user'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">parts</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[{</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">text</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Have a wonderful day!'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">speechMetadata</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">style</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'cheerful and friendly'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-p">}],</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-p">}],</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-nx">config</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">responseModalities</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-s1">'AUDIO'</span><span class="devsite-syntax-p">],</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">responseFormat</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">audio</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">               </span><span class="devsite-syntax-nx">mimeType</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'AUDIO_L16'</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">               </span><span class="devsite-syntax-nx">sampleRate</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">24000</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-nx">speechConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-nx">voiceConfig</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">voice</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Kore'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">         </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-p">},</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-p">});</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">response</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">candidates</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.[</span><span class="devsite-syntax-mf">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">content</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">parts</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.[</span><span class="devsite-syntax-mf">0</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">inlineData</span><span class="devsite-syntax-o">?</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">audioBuffer</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">Buffer</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-kr">from</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">data</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'base64'</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-w">   </span><span class="devsite-syntax-nx">fs</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">writeFileSync</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'out.pcm'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">audioBuffer</span><span class="devsite-syntax-p">);</span>
<span class="devsite-syntax-p">}</span>
<span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">main</span><span class="devsite-syntax-p">();</span>
</code></pre></devsite-code></section>
<section><h3 id="rest_4" data-text="REST" tabindex="-1">REST</h3><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Bash"><code translate="no" dir="ltr">curl<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-H<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"x-goog-api-key: </span><span class="devsite-syntax-nv">$GEMINI_API_KEY</span><span class="devsite-syntax-s2">"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-X<span class="devsite-syntax-w"> </span>POST<span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-H<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"Content-Type: application/json"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">  </span>-d<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'{</span>
<span class="devsite-syntax-s1">        "contents": [{</span>
<span class="devsite-syntax-s1">          "role": "user",</span>
<span class="devsite-syntax-s1">          "parts": [{</span>
<span class="devsite-syntax-s1">            "text": "Have a wonderful day!",</span>
<span class="devsite-syntax-s1">            "speech_metadata": {</span>
<span class="devsite-syntax-s1">              "style": "cheerful and friendly"</span>
<span class="devsite-syntax-s1">            }</span>
<span class="devsite-syntax-s1">          }]</span>
<span class="devsite-syntax-s1">        }],</span>
<span class="devsite-syntax-s1">        "generationConfig": {</span>
<span class="devsite-syntax-s1">          "responseModalities": ["AUDIO"],</span>
<span class="devsite-syntax-s1">          "responseFormat": {</span>
<span class="devsite-syntax-s1">            "audio": {</span>
<span class="devsite-syntax-s1">              "mimeType": "AUDIO_L16",</span>
<span class="devsite-syntax-s1">              "sampleRate": 24000</span>
<span class="devsite-syntax-s1">            }</span>
<span class="devsite-syntax-s1">          },</span>
<span class="devsite-syntax-s1">          "speechConfig": {</span>
<span class="devsite-syntax-s1">            "voiceConfig": {</span>
<span class="devsite-syntax-s1">              "voice": "Kore"</span>
<span class="devsite-syntax-s1">            }</span>
<span class="devsite-syntax-s1">          }</span>
<span class="devsite-syntax-s1">        }</span>
<span class="devsite-syntax-s1">    }'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">|</span><span class="devsite-syntax-w"> </span>jq<span class="devsite-syntax-w"> </span>-r<span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'.candidates[0].content.parts[0].inlineData.data'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">          </span>base64<span class="devsite-syntax-w"> </span>--decode<span class="devsite-syntax-w"> &gt; </span>out.pcm
</code></pre></devsite-code></section>
</devsite-selector></div>
<h2 id="limitations" data-text="Limitations" tabindex="-1">Limitations</h2>

<ul>
<li>TTS models accept text-only inputs and generate audio-only outputs.</li>
<li>Single-request multi-speaker generation (<code translate="no" dir="ltr">multiSpeakerVoiceConfig</code>) supports
up to 2 speakers using prebuilt voices. To combine custom designed
(<code translate="no" dir="ltr">voice_...</code>) or replicated (<code translate="no" dir="ltr">voice_...</code> / <code translate="no" dir="ltr">voicekey_...</code>) voices in
multi-character dialogue, synthesize each speaker&#39;s turn individually.
Because unary requests return <code translate="no" dir="ltr">audio/wav</code> with a 44-byte RIFF header by
default, request raw PCM (<code translate="no" dir="ltr">AUDIO_L16</code>) or strip the WAV header from each
turn before concatenating the 24kHz PCM audio frames.</li>
<li><strong>Custom voice storage limits and TTL:</strong>
<ul>
<li><strong>Stateful voices (<code translate="no" dir="ltr">store=True</code>, prompted or replicated):</strong> Maximum of
<strong>200 voices per project</strong> with a <strong>1-year TTL</strong> (time-to-live).</li>
<li><strong>Stateless voice keys (<code translate="no" dir="ltr">store=False</code>, <code translate="no" dir="ltr">voicekey_...</code>):</strong> <strong>7-day TTL</strong>
(time-to-live).</li>
</ul></li>
<li>Review the
<a href="/gemini-api/docs/generate-content/speech-generation#languages">Supported languages</a>
section for language coverage.</li>
</ul>

<h2 id="whats-next" data-text="What's next" tabindex="-1">What's next</h2>

<ul>
<li>Create custom vocal personas from natural language with
<a href="/gemini-api/docs/generate-content/voice-design">Voice design</a>.</li>
<li>Replicate an existing speaker&#39;s voice in
<a href="/gemini-api/docs/generate-content/voice-replication">Voice replication</a>.</li>
<li>Compare model specifications on the
<a href="/gemini-api/docs/models/gemini-3.8-flash-tts">Gemini 3.8 Flash TTS</a> and
<a href="/gemini-api/docs/models/gemini-3.8-flash-lite-tts">Gemini 3.8 Flash-Lite TTS</a>
model pages.</li>
<li>Explore interactive bidirectional audio with the
<a href="/gemini-api/docs/live">Live API</a>.</li>
</ul>
<link href="https://fonts.googleapis.com/css2?family=Google+Symbols:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" data-page-link>
  

  
</div>

  
    
    
      
    <devsite-thumb-rating position="footer">
    </devsite-thumb-rating>
  
       
         <devsite-feedback
  position="footer"
  project-name="Gemini Generate Content API (Legacy)"
  product-id="5292923"
  bucket="documentation"
  context=""
  version="t-devsite-webserver-20261006-r00-rc02.480918341592349554"
  data-label="Send Feedback Button"
  track-type="feedback"
  track-name="sendFeedbackLink"
  track-metadata-position="footer"
  class="nocontent"
  data-nosnippet
  
  
  
    project-icon="https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/googledevai/images/touchicon-180-new.png"
  
  
  
  >

  <button>
  
    
    Send feedback
  
  </button>
</devsite-feedback>
       
    
    
  

  <div class="devsite-floating-action-buttons"></div></article>


<devsite-content-footer class="nocontent" data-nosnippet>
  <p>Except as otherwise noted, the content of this page is licensed under the <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 License</a>, and code samples are licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0 License</a>. For details, see the <a href="https://developers.google.com/site-policies">Google Developers Site Policies</a>. Java is a registered trademark of Oracle and/or its affiliates.</p>
  <p>Last updated 2026-10-01 UTC.</p>
</devsite-content-footer>


<devsite-notification
>
</devsite-notification>


  
<div class="devsite-content-data">
  
    
    
    <template class="devsite-thumb-rating-feedback">
      <devsite-feedback
  position="thumb-rating"
  project-name="Gemini Generate Content API (Legacy)"
  product-id="5292923"
  bucket="documentation"
  context=""
  version="t-devsite-webserver-20261006-r00-rc02.480918341592349554"
  data-label="Send Feedback Button"
  track-type="feedback"
  track-name="sendFeedbackLink"
  track-metadata-position="thumb-rating"
  class="nocontent"
  data-nosnippet
  
  
  
    project-icon="https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/googledevai/images/touchicon-180-new.png"
  
  
  
  >

  <button>
  
    Need to tell us more?
  
  </button>
</devsite-feedback>
    </template>
  
  
    <template class="devsite-content-data-template">
      [[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Missing the information I need","missingTheInformationINeed","thumb-down"],["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"],["Out of date","outOfDate","thumb-down"],["Samples / code issue","samplesCodeIssue","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2026-10-01 UTC."],[],[]]
    </template>
  
</div>
            
          </devsite-content>
        </main>
        <devsite-footer-promos class="devsite-footer">
          
            
          
        </devsite-footer-promos>
        <devsite-footer-linkboxes class="devsite-footer">
          
            
<nav class="devsite-footer-linkboxes nocontent"
     aria-label="Footer links"
     data-nosnippet>
  
</nav>
          
        </devsite-footer-linkboxes>
        <devsite-footer-utility class="devsite-footer">
          
            

<div class="devsite-footer-utility nocontent" data-nosnippet>
  

  
  <nav class="devsite-footer-utility-links" aria-label="Utility links">
    
    <ul class="devsite-footer-utility-list">
      
      <li class="devsite-footer-utility-item
                 ">
        
        
        <a class="devsite-footer-utility-link gc-analytics-event"
           href="//policies.google.com/terms"
           data-category="Site-Wide Custom Events"
           data-label="Footer Terms link"
         >
          Terms
        </a>
        
      </li>
      
      <li class="devsite-footer-utility-item
                 ">
        
        
        <a class="devsite-footer-utility-link gc-analytics-event"
           href="//policies.google.com/privacy"
           data-category="Site-Wide Custom Events"
           data-label="Footer Privacy link"
         >
          Privacy
        </a>
        
      </li>
      
      <li class="devsite-footer-utility-item
                 glue-cookie-notification-bar-control">
        
        
        <a class="devsite-footer-utility-link gc-analytics-event"
           href="#"
           data-category="Site-Wide Custom Events"
           data-label="Footer Manage cookies link"
         
           aria-hidden="true"
         >
          Manage cookies
        </a>
        
      </li>
      
    </ul>
    
    
<devsite-language-selector>
  <ul role="presentation">
    
    
    <li role="presentation">
      <a role="menuitem" lang="en"
        >English</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="de"
        >Deutsch</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="es_419"
        >Español – América Latina</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="fr"
        >Français</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="id"
        >Indonesia</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="it"
        >Italiano</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="pl"
        >Polski</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="pt_br"
        >Português – Brasil</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="sq"
        >Shqip</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="vi"
        >Tiếng Việt</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="tr"
        >Türkçe</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="ru"
        >Русский</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="he"
        >עברית</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="ar"
        >العربيّة</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="fa"
        >فارسی</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="hi"
        >हिंदी</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="bn"
        >বাংলা</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="th"
        >ภาษาไทย</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="zh_cn"
        >中文 – 简体</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="zh_tw"
        >中文 – 繁體</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="ja"
        >日本語</a>
    </li>
    
    <li role="presentation">
      <a role="menuitem" lang="ko"
        >한국어</a>
    </li>
    
  </ul>
</devsite-language-selector>

  </nav>
</div>
          
        </devsite-footer-utility>
        <devsite-panel>
          
        </devsite-panel>
        
      </section>
      </section>
    <devsite-sitemask></devsite-sitemask>
    <devsite-snackbar></devsite-snackbar>
    <devsite-tooltip ></devsite-tooltip>
    <devsite-heading-link></devsite-heading-link>
    <devsite-analytics>
      
        <script type="application/json" analytics>[]</script>
<script type="application/json" tag-management>{&#34;at&#34;: &#34;True&#34;, &#34;ga4&#34;: [], &#34;ga4p&#34;: [], &#34;gtm&#34;: [{&#34;id&#34;: &#34;GTM-TC2MQKS8&#34;, &#34;purpose&#34;: 0}], &#34;parameters&#34;: {&#34;internalUser&#34;: &#34;False&#34;, &#34;language&#34;: {&#34;machineTranslated&#34;: &#34;False&#34;, &#34;requested&#34;: &#34;en&#34;, &#34;served&#34;: &#34;en&#34;}, &#34;pageType&#34;: &#34;article&#34;, &#34;projectName&#34;: &#34;Gemini Generate Content API (Legacy)&#34;, &#34;signedIn&#34;: &#34;False&#34;, &#34;tenant&#34;: &#34;googledevai&#34;, &#34;recommendations&#34;: {&#34;sourcePage&#34;: &#34;&#34;, &#34;sourceType&#34;: 0, &#34;sourceRank&#34;: 0, &#34;sourceIdenticalDescriptions&#34;: 0, &#34;sourceTitleWords&#34;: 0, &#34;sourceDescriptionWords&#34;: 0, &#34;experiment&#34;: &#34;&#34;}, &#34;experiment&#34;: {&#34;ids&#34;: &#34;&#34;}}}</script>
      
    </devsite-analytics>
    
      <devsite-badger></devsite-badger>
    
    
    
    
<script nonce="nnxPdLq+gEnEJYIablj1qluKrQdDc9">
  
  (function(d,e,v,s,i,t,E){d['GoogleDevelopersObject']=i;
    t=e.createElement(v);t.async=1;t.src=s;E=e.getElementsByTagName(v)[0];
    E.parentNode.insertBefore(t,E);})(window, document, 'script',
    'https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/googledevai/js/app_loader.js', '[59,"en",null,"/js/devsite_app_module.js","https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31","https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/googledevai","https://googledevai-dot-devsite-v2-prod-3p.appspot.com",null,null,["/_pwa/googledevai/manifest.json","https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/images/video-placeholder.svg","https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/googledevai/images/favicon-new.png","/_static/googledevai/images/gemini-api-logo.svg","https://fonts.googleapis.com/css?family=Google+Sans:400,500|Roboto:400,400italic,500,500italic,700,700italic|Roboto+Mono:400,500,700|Inter:400,500|Inter+Tight:300,500,600&display=swap"],1,null,[1,6,8,12,14,17,21,25,50,52,63,70,75,76,80,87,91,92,93,97,98,100,101,102,103,104,105,107,108,109,110,112,113,116,117,118,120,122,124,125,126,127,129,130,131,132,133,134,135,136,138,140,141,147,148,149,151,152,156,157,158,159,161,163,164,168,169,170,179,180,182,183,186,191,193,196],"AIzaSyCNm9YxQumEXwGJgTDjxoxXK6m1F-9720Q","AIzaSyCc76DZePGtoyUjqKrLdsMGk_ry7sljLbY","ai.google.dev","AIzaSyB9bqgQ2t11WJsOX8qNsCQ6U-w91mmqF-I","AIzaSyAdYnStPdzjcJJtQ0mvIaeaMKj7_t6J_Fg",null,null,null,["DevPro__enable_embed_profile_creation","DevPro__enable_g1_ineligible_redirect","DevPro__enable_g1_integration","DevPro__enable_google_one_card","DevPro__enable_developer_subscriptions","Profiles__enable_release_notes_notifications","Profiles__enable_developer_profile_benefits_ui_redesign","Profiles__enable_awarding_url","Experiments__reqs_query_experiments","Profiles__require_profile_eligibility_for_signin","OnSwitch__enable","DevPro__enable_google_payments_buyflow","EngEduTelemetry__enable_engedu_telemetry","Search__enable_ai_search_summaries_for_all","Cloud__enable_legacy_calculator_redirect","Profiles__enable_page_saving","DevPro__enable_devsite_captcha","TpcFeatures__enable_unmirrored_page_left_nav","Profiles__enable_callout_notifications","Profiles__enable_public_developer_profiles","TpcFeatures__proxy_prod_host","MiscFeatureFlags__enable_view_transitions","AIStudioInteractionsToggle__interactions_are_default","MiscFeatureFlags__enable_framebox_badge_methods","BookNav__enable_tenant_cache_key","Cloud__cache_serialized_dynamic_content","Profiles__enable_stripe_subscription_management","MiscFeatureFlags__enable_llms_txt","Concierge__enable_remove_info_panel_tags","DevPro__enable_vertex_credit_card","Profiles__enable_completequiz_endpoint","Analytics__enable_clearcut_logging","Search__enable_suggestions_from_borg","Cloud__enable_free_trial_server_call","DevPro__enable_free_benefits","DevPro__remove_eu_tax_intake_form","Profiles__enable_user_type","Profiles__enable_auto_apply_credits","Profiles__enable_complete_playlist_endpoint","Profiles__enable_purchase_prompts","Concierge__enable_actions_menu","MiscFeatureFlags__developers_footer_image","DevPro__enable_credits_banner","DevPro__enable_firebase_workspaces_card","MiscFeatureFlags__developers_footer_dark_image","Analytics__enable_devpro_interaction_logging","DevPro__enable_enterprise","Cloud__enable_cloud_dlp_service","Search__enable_page_map","Profiles__enable_playlist_community_acl","DevPro__enable_cloud_innovators_plus","Profiles__enable_dashboard_curated_recommendations","MiscFeatureFlags__enable_variable_operator_index_yaml","Profiles__enable_join_program_group_endpoint","Cloud__fast_free_trial","Cloud__enable_cloud_shell","MiscFeatureFlags__gdp_dashboard_reskin_enabled","Profiles__enable_recognition_badges","Profiles__enable_developer_profiles_callout","Profiles__enable_profile_collections","CloudShell__cloud_code_overflow_menu","Profiles__enable_targeted_hero","Concierge__enable_pushui","MiscFeatureFlags__enable_explain_this_code","DevPro__enable_code_assist","MiscFeatureFlags__enable_project_variables","DevPro__enable_nvidia_credits_card","MiscFeatureFlags__fix_lower_breadcrumbs","MiscFeatureFlags__enable_firebase_utm","Search__enable_dynamic_content_confidential_banner","Profiles__enable_developer_profile_pages_as_content","DevPro__enable_devpro_offers","Search__enable_ai_eligibility_checks","CloudShell__cloud_shell_button","Profiles__enable_completecodelab_endpoint","Cloud__enable_cloudx_experiment_ids","Concierge__enable_devsite_llm_tools","MiscFeatureFlags__enable_appearance_cookies","MiscFeatureFlags__enable_explicit_template_dependencies","SignIn__enable_l1_signup_flow","MiscFeatureFlags__enable_variable_operator","MiscFeatureFlags__remove_cross_domain_tracking_params","Cloud__enable_cloud_shell_fte_user_flow"],null,null,"AIzaSyA58TaKli1DculwmAmbpzLVGuWc8eCQgQc","https://developerscontentserving-pa.googleapis.com","AIzaSyDWBU60w0P9hEkr29kkksYs8Z7gvZ8u_wc","https://developerscontentsearch-pa.googleapis.com",2,4,null,"https://developerprofiles-pa.googleapis.com",[59,"googledevai","Google AI for Developers","ai.google.dev",null,"googledevai-dot-devsite-v2-prod-3p.appspot.com",null,null,[null,1,null,null,null,null,null,null,null,null,null,[1],null,null,null,null,null,null,[1],null,null,null,null,[1],[1,1,null,1,1],null,null,null,null,null,[1]],null,[73,null,null,null,null,null,"/images/lockup-new.svg","/images/touchicon-180-new.png",null,null,null,null,1,1,null,null,null,null,null,null,null,2,null,null,null,"/images/lockup-dark-theme-new.svg",[]],[],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[44,2,4,6,7,12,14,15,17,18,20,21,22,23,28,29,32,37,39,40,43],null,[[],[1,1],null,1],[[null,null,null,null,null,["GTM-TC2MQKS8"],null,null,null,null,null,[["GTM-TC2MQKS8",1]],1]],null,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[]],null,null,1,null,"https://developerscontentinsights-pa.googleapis.com","AIzaSyC11xEGtFhkmSh_iF6l_itbxnFz2GrIBOg","AIzaSyAXJ10nRF73mmdSDINgkCNX5bbd2KPcWm8","https://developers.googleapis.com",["https://aistudio.google.com"],null,"AIzaSyCjP0KOnHfv8mwe38sfzZJMOnqE3HvrD4A",null,null,"https://developers.googleapis.com"]')
  
</script>

    <devsite-a11y-announce></devsite-a11y-announce>
  </body>
</html>
~~~~
