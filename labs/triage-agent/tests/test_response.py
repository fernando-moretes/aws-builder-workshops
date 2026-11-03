import unittest
from agent import final_response

class ResponseTests(unittest.TestCase):
    def test_internal_block_is_not_presented(self):
        answer, warnings = final_response('<thinking>draft</thinking>Consulta desconhecida.', [])
        self.assertEqual(answer, 'Consulta desconhecida.')
        self.assertEqual(warnings, [])

    def test_incomplete_or_empty_final_is_rejected(self):
        for text in ['<thinking>draft', '<thinking>draft</thinking>', '']:
            with self.subTest(text=text), self.assertRaises(ValueError):
                final_response(text, [])

    def test_missing_source_is_diagnostic(self):
        _, warnings = final_response('Sem citação.', [{'source':'fixture://A1/status/api'}])
        self.assertEqual(len(warnings), 1)

    def test_invented_source_is_diagnostic(self):
        _, warnings = final_response('Veja fixture://A1/status/fila.', [])
        self.assertEqual(len(warnings), 1)

    def test_retrieved_citation_is_recognized(self):
        _, warnings = final_response('Veja fixture://A1/status/api.', [{'source':'fixture://A1/status/api'}])
        self.assertEqual(warnings, [])

if __name__ == '__main__': unittest.main()
