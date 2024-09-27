import { Controller, Get, Param, Render, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('quotes')
  @Render('index')
  findAll(){
    return{
      quotes: this.appService.findAll()
    } 
  }

  @Get('randomQuote')
  randomQuote(){
    return this.appService.randomQuote();
  }

  @Get('topAuthor')
  topAuthor(){
    return this.appService.topAuthor();
  }

  @Get('quote/:id')
  Findquote(@Param('id') id: string){
    return this.appService.Findquote(+id);
  }

  @Get('/authorRandomForm')
  @Render('authorRandomForm')
  showAuthorForm() {
    return { quote: null, errorMessage: null };
  }
  

  @Post('/authorRandom')
  @Render('authorRandomForm')
  getRandomQuoteByAuthor(@Body('author') author: string) {
    const quote = this.appService.getRandomQuoteByAuthor(author);
    
    if (!quote) {
      return { errorMessage: 'No quotes found for this author', quote: null };
    }
    
    return { quote };
  }

  @Get('/search')
  @Render('search')
  searchQuotes(@Query('text') searchText: string) {
    if (!searchText) {
      return { quotes: [], searchText: '' };
    }

    const quotes = this.appService.searchQuotesByText(searchText);
    return { quotes, searchText };
  }

  @Get('/highlight/:id')
  @Render('highlightQuote')
  highlightQuote(@Param('id') id: string, @Query('text') highlightText: string) {
    const quote = this.appService.getQuoteById(Number(id));
  
    console.log('Retrieved Quote:', quote); // Log the quote
    console.log('Highlight Text:', highlightText); // Log the highlight text
  
    if (!quote) {
      return { errorMessage: `No quote found with ID ${id}` };
    }
  
    return { quote, highlightText };
  }
}
