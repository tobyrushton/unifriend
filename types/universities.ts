export type University =
    | 'Abertay University'
    | 'Aberystwyth University'
    | 'Anglia Ruskin University'
    | 'Aston University'
    | 'Bangor University'
    | 'Bath Spa University'
    | 'Birbeck, University of London'
    | 'Birmingham City University'
    | 'Bournemouth University'
    | 'Brunel University'
    | 'Bucks New Univeristy'
    | 'Canterbury Christ Church University'
    | 'Cardiff Met'
    | 'Cardiff University'
    | 'Central School of Speech and Drama'
    | 'City University London '
    | 'Coventry University '
    | 'Cranfield University'
    | 'De Montford University '
    | 'Durham University '
    | 'Edge Hill University '
    | 'Edinburgh Napier University'
    | 'Glasgow caledonian University'
    | 'Glyndwr University '
    | 'Goldsmiths, University of London'
    | 'Guildhall School of Music and Drama'
    | 'Harper Adams Univeristy '
    | 'Heriot-Watt University'
    | 'Heythrop College'
    | 'Imperial College London '
    | 'Keele University '
    | 'Kings College London'
    | 'Kingston University'
    | 'Lancaster University'
    | 'Leeds Beckett University '
    | 'Liverpool Hope University'
    | 'Liverpool John Moores'
    | 'London Business School'
    | 'London Met'
    | 'London School of Economics'
    | 'London School of Hygiene'
    | 'London South Bank University'
    | 'LoughBorough University'
    | 'Manchester Metropolitan University '
    | 'Middlesex University'
    | 'Newcastle University'
    | 'Northumbria University'
    | 'Nottingham Trent University'
    | 'Open University'
    | 'Oxford Brookes University'
    | 'Plymouth University'
    | 'Queen Margaret University'
    | 'Queen Mary London '
    | "Queen's University Belfast"
    | 'Robert Gordon University '
    | 'Royal Academy of Music'
    | 'Royal College of Art '
    | 'Royal College of Music '
    | 'Royal Holloway'
    | 'Royal Veterinary College'
    | 'School of Oriental and African Studies'
    | 'Sheffield Hallam University'
    | 'Southampton Solent University'
    | "St George's University of London"
    | 'Staffordshire University'
    | 'Swansea University'
    | 'Teeside University '
    | 'Trinity Laban Conservatoire of Music and Dance'
    | 'Trinity St David'
    | 'University College London'
    | 'University of Aberdeen'
    | 'University of Bath'
    | 'University of Bedfordshire'
    | 'University of Birmingham'
    | 'University of Bolton'
    | 'University of Bradford'
    | 'University of Brighton '
    | 'University of Bristol '
    | 'University of Cambridge'
    | 'University of Central Lancashire'
    | 'University of Chester'
    | 'University of Chicester'
    | 'University of Cumbria '
    | 'University of Derby '
    | 'University of Dundee '
    | 'University of East Anglia '
    | 'University of East London'
    | 'University of Edinburgh'
    | 'University of Essex '
    | 'University of Exeter'
    | 'University of Glasgow  '
    | 'University of Gloucestershire'
    | 'University of Greenwich'
    | 'University of Hertfordshire'
    | 'University of Huddersfield'
    | 'University of Hull'
    | 'University of Kent'
    | 'University of Leeds'
    | 'University of Leicester'
    | 'University of Lincoln '
    | 'University of Liverpool'
    | 'University of London'
    | 'University of Manchester'
    | 'University of Northampton '
    | 'University of Nottingham'
    | 'University of Oxford '
    | 'University of Portsmouth'
    | 'University of Reading '
    | 'University of Roehampton '
    | 'University of Salford'
    | 'University of Sheffield'
    | 'University of South Wales'
    | 'University of Southampton '
    | 'University of Stirling'
    | 'University of Strathclyde'
    | 'University of Sunderland '
    | 'University of Surrey '
    | 'University of Sussex'
    | 'University of the Arts London'
    | 'University of the West of Scotland'
    | 'University of Ulster'
    | 'University of Wales'
    | 'University of Wales, Trinity St David '
    | 'University of Warwick'
    | 'University of West England, Bristol'
    | 'University of West London'
    | 'University of Westminster'
    | 'University of Winchester'
    | 'University of Wolverhampton'
    | 'University of Worcester  '
    | 'University of York '
    | 'University St Andrews'
    | 'York St John University'
    | 'test university'

export interface UniversityEmail {
    university: University
    email: string
}

export type UniversityEmailArray = UniversityEmail[]
