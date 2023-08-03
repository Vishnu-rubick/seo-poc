import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json

def get_domain(url):
    url_without_protocol = url.split('//', 1)[-1]
    domain = url_without_protocol.split('/', 1)[0]
    return domain

# def get_outbound_domains(url, main_url, visited_pages=None, outbound_domains=None):
#     if visited_pages is None:
#         visited_pages = set()
#     if outbound_domains is None:
#         outbound_domains = set()

#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser')

#     for link in soup.find_all('a', href=True):
#         href = link['href']
#         if main_url and main_url in href:  # Skip main website URL and its internal pages
#             continue
#         if href.startswith('http') and url not in href:
#             outbound_domains.add(href)
#         elif not href.startswith('http') and not href.startswith('#'):
#             internal_link = urljoin(url, href)
#             if internal_link not in visited_pages and main_url in internal_link:
#                 visited_pages.add(internal_link)
#                 get_outbound_domains(internal_link, main_url, visited_pages, outbound_domains)

#     return outbound_domains


def get_outbound_domains_with_freq(url, main_url, visited_pages=None, outbound_domains=None):
    if visited_pages is None:
        visited_pages = {}
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
            print(internal_link, '\n')
            if internal_link not in visited_pages:
               visited_pages[internal_link] = 0

            visited_pages[internal_link] += 1 
            if visited_pages[internal_link] == 1 and main_url in internal_link:
                get_outbound_domains_with_freq(internal_link, main_url, visited_pages, outbound_domains)
    
    return [outbound_domains, visited_pages]


if __name__ == "__main__":
    website_url = 'https://quotes.toscrape.com/'
    client_domain = get_domain(website_url)
    
    main_url = website_url  # Store the main website URL
    [outbound_domains, visited_pages] = get_outbound_domains_with_freq(website_url, main_url=main_url)

    # Extract unique domain names
    unique_domains = set()
    for domain in outbound_domains:
        unique_domains.add(domain.split('/')[2])  # Extract domain from the URL

    # Write outbound domains to a file
    with open(f'data/{client_domain}_outbound_domains.txt', 'w') as file:
        for domain in outbound_domains:
            file.write(domain + '\n')

    # Write unique domains to a separate file
    with open(f'data/{client_domain}_unique_domains_names.txt', 'w') as file:
        for domain in unique_domains:
            file.write(domain + '\n')

    with open(f'data/{client_domain}_freq.json', 'w') as file:
        json.dump(visited_pages, file)
