use anchor_lang::prelude::*;

declare_id!("5TtSuWwcCr5ww4Kef2aYsvT8uF9H1hHGyC7fhsCwAaUx");

#[program]
pub mod crappier_program {
    use anchor_lang::{
        solana_program::entrypoint::ProgramResult,
        system_program::{ transfer, Transfer },
    };
    use super::*;
    pub fn transfer_sol_to_account(
        ctx: Context<TransferSolToAccount>,
        email: String,
        amount: u64
    ) -> ProgramResult {
        let from_pubkey = ctx.accounts.pot.to_account_info();
        let to_pubkey = ctx.accounts.reciever.to_account_info();
        let program_id = ctx.accounts.system_program.to_account_info();
        let seeds: &[&[&[u8]]] = &[&[b"pot", email.as_bytes(), &[ctx.bumps.pot]]];
        let cpi_ctx = CpiContext::new(program_id, Transfer {
            from: from_pubkey,
            to: to_pubkey,
        }).with_signer(seeds);
        transfer(cpi_ctx, amount)?;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(email:String)]
pub struct TransferSolToAccount<'info> {
    #[account(
        mut,
        seeds=[b"pot", email.as_bytes()],
        bump,
    )]
    pot: SystemAccount<'info>,
    #[account(mut)]
    reciever: SystemAccount<'info>,
    system_program: Program<'info, System>,
}
