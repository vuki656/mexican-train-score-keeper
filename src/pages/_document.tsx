import { createGetInitialProps } from '@mantine/next'
import NextDocument, {
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document'

const getInitialProps = createGetInitialProps()

export default class Document extends NextDocument {
    public static getInitialProps = getInitialProps

    public render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

