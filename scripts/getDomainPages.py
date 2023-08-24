import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json
from collections import deque

def get_domain(url):
    url_without_protocol = url.split('//', 1)[-1]
    domain = url_without_protocol.split('/', 1)[0]
    return domain

def parseSiteMap(url, visited):
    res = []

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'xml')

    print("file: ", url)

    for link in soup.select('url loc'):
        res.append(link.get_text())

    for link in soup.select('sitemap loc'):
        res.append(link.get_text())

    return res



def get_all_domain_pages(domain, robotsUrl):
    response = requests.get(robotsUrl)

    soup = BeautifulSoup(response.content, 'html.parser')
    robotsContent = soup.get_text()

    qu = deque()
    res = []
    V = {}
    robotsContent = robotsContent.split('\n')

    print(robotsContent)

    for line in robotsContent:
        if not line.startswith('Sitemap: '):
            continue
        
        nextLink = line.split('Sitemap: ')[1].strip()
        if nextLink.find('sitemap') != -1:
            qu.append(nextLink)
        else:
            res.append(nextLink)

    visited = {}
    # qu.popleft()
    # parseSiteMap(qu.popleft(), visited=visited)

    while len(qu):
        siteMapLink = qu.popleft()
        visited[siteMapLink] = 1

        for link in parseSiteMap(siteMapLink, visited=visited):
            if visited.get(link) is not None:
                continue
            if link.find('sitemap') != -1:
                qu.append(link)
            else:
                res.append(link)

    return res


if __name__ == "__main__":
    website_url = 'https://peppercontent.io'
    client_domain = get_domain(website_url)
    robotsFile = website_url + '/robots.txt'
    
    allDomainPages = get_all_domain_pages(client_domain, robotsUrl=robotsFile)

    print(client_domain, ' has ', len(allDomainPages), ' pages.')

    with open(f'data/{client_domain}_all_domain_pages.json', 'w') as file:
        json.dump(allDomainPages, file)

