import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def get_outbound_domains(url, main_url, visited_pages=None, outbound_domains=None):
    if visited_pages is None:
        visited_pages = set()
    if outbound_domains is None:
        outbound_domains = set()

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    for link in soup.find_all('a', href=True):
        href = link['href']
        if main_url and main_url in href:  # Skip main website URL and its internal pages
            continue
        if href.startswith('http') and url not in href:
            outbound_domains.add(href)
        elif not href.startswith('http') and not href.startswith('#'):
            internal_link = urljoin(url, href)
            if internal_link not in visited_pages and main_url in internal_link:
                visited_pages.add(internal_link)
                get_outbound_domains(internal_link, main_url, visited_pages, outbound_domains)

    return outbound_domains

if __name__ == "__main__":
    website_url = 'https://www.textmercato.com'
    main_url = website_url  # Store the main website URL
    outbound_domains = get_outbound_domains(website_url, main_url=main_url)

    # Extract unique domain names
    unique_domains = set()
    for domain in outbound_domains:
        unique_domains.add(domain.split('/')[2])  # Extract domain from the URL

    # Write outbound domains to a file
    with open('outbound_domains_urls.txt', 'w') as file:
        for domain in outbound_domains:
            file.write(domain + '\n')

    # Write unique domains to a separate file
    with open('unique_domains_names.txt', 'w') as file:
        for domain in unique_domains:
            file.write(domain + '\n')
